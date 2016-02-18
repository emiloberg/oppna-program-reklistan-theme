(function() {

  var renderDiffPreviews = function(articlePublished, articleDraft, hbsTemplate) {

      $('.open-self-new-window').attr('href', window.location.href);

      registerHandlebarHelpers();
      Swag.registerHelpers(Handlebars);

      var metaData = {
          title: articleDraft.title,
          date: getDate()
      };

      printHbsTemplate(metaData, '#title-template', '#title-target');
      printHbsTemplate(articleDraft, '', '#draft-target', hbsTemplate);
      printHbsTemplate(articlePublished, '', '#published-target', hbsTemplate);

      jqHtmlPublishedTarget = $('#published-target');
      jqHtmlDraftTarget = $('#draft-target');
      jqHtmlDiffTarget= $('#diff-target');

      var htmlPublished = jqHtmlPublishedTarget.html();
      var htmlDraft= jqHtmlDraftTarget.html();
      var articleDiff;

      if (htmlDraft === htmlPublished) {
        articleDiff = '<p class="no-diffs">Inga ändringar från publicerad version</p>';
      } else {
        articleDiff = htmldiff(htmlPublished, htmlDraft);
      }
      jqHtmlDiffTarget.html(articleDiff);

      // Show and hide the previews
      $('.toggle-show-published').click(function (event) {
        event.preventDefault();
        $('.preview-box-draft').addClass('hide-me');
        $('.preview-box-published').removeClass('hide-me');
      });

      $('.toggle-show-draft').click(function (event) {
          event.preventDefault();
          $('.preview-box-published').addClass('hide-me');
          $('.preview-box-draft').removeClass('hide-me');
      });

      $('.checkbox-show-preview-published-draft').change(function () {
          if (this.checked) {
              $('.preview-box-published').addClass('hide-me');
              $('.preview-box-draft').removeClass('hide-me');
          } else {
              $('.preview-box-published').addClass('hide-me');
              $('.preview-box-draft').addClass('hide-me');
          }
          setSinglePreviewClass();
      });

      $('.checkbox-show-preview-diff').change(function () {
          if (this.checked) {
              $('.preview-box-diff').removeClass('hide-me');
          } else {
              $('.preview-box-diff').addClass('hide-me');
          }
          setSinglePreviewClass();
      });

      extractAndPrintTables(jqHtmlPublishedTarget, jqHtmlDraftTarget, jqHtmlDiffTarget);

      function setSinglePreviewClass() {
        var numberOfChecks = $('.chekbox-show-preview:checked').length;
        if (numberOfChecks === 2 || numberOfChecks === 0) {
          $('.single-preview-box').removeClass('single-preview-box');
        } else if (numberOfChecks === 1) {
          $('.preview-box').addClass('single-preview-box');
        }
      }

      function pad(number) {
          if (number < 10) {
              return '0' + number;
          }
          return number;
      }

      function getDate() {
          var now = new Date();
          return now.getFullYear() +
              '-' + pad(now.getMonth() + 1) +
              '-' + pad(now.getDate()) +
              ' ' + pad(now.getHours()) +
              ':' + pad(now.getMinutes());
      }

  };

  this.renderDiffPreviews = renderDiffPreviews;

}).call(this);


/**
 * In preview mode, we want to show how the tables look, both in
 * mobile and in normal mode.
 * @param jqHtmlPublished
 * @param jqHtmlDraft
 */
function extractAndPrintTables(jqHtmlPublished, jqHtmlDraft, jqHtmlDiff) {
    convertTables(jqHtmlPublished, $('#published-meta-target'));
    convertTables(jqHtmlDraft, $('#draft-meta-target'));
    convertTables(jqHtmlDiff, $('#diff-meta-target'));

    function convertTables(jqSource, jqTarget) {
        var hasAdded = false;
        jqSource.find('table').each(function (i) {
            var jqThis = $(this);
            var columnCount = jqThis.find('tr').first().find('td, th').length;

            if (columnCount > 2) {
                hasAdded = true;
                jqTarget.append(jqThis.clone());
            }
        });
        jqTarget.find('table').stacktable({minColCount:2});
        if (hasAdded) {
            jqTarget.prepend('<h3 class="preview-meta-title">Mobiltabeller</h3>');
        }

    }
}

function registerHandlebarHelpers() {
  /**
   * Parse the text and do some replacing
   *
   * Usage:
   * {{markdownify variable}}
   */
  Handlebars.registerHelper('markdownify', function(context) {
      var text = context || '';

      // Convert markdown links to html links
      text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="\$2">\$1</a>');

      // Convert {{replaceable}} with icon
      text = text.replace(/\{\{replaceable\}\}/g, '<span class="replaceable">&#8860;</span>');
      text = text.replace(/\{\{child\}\}/g, '<img src="/reklistan-theme/images/theme/child.png" class="child-icon">');

      return new Handlebars.SafeString(text);
  });


    /**
     * Replace medium selector (web, mobile, both) to plain text
     *
     * Usage:
     * {{parsemedium variable}}
     */
    Handlebars.registerHelper('parsemedium', function(context) {
        var text = context || '';

        text = text.replace(/\[\"both\"\]/g, 'både mobil och webb');
        text = text.replace(/\[\"web\"\]/g, 'enbart mobil');
        text = text.replace(/\[\"mobile\"\]/g, 'enbart webb');

        return new Handlebars.SafeString(text);
    });
}


 /**
 * Mangle data + template and create output
 *
 * @param {Object} data JSON-data
 * @param {string} templateSelector Selector for the element holding the template
 * @param {string} targetSelector Selector for the element where finished DOM should be placed.
 * *@param {string} hbsTemplate Passing in a handlebars template instead of using the templateSelcetor
 */
function printHbsTemplate(data, templateSelector, targetSelector, hbsTemplate) {
    var templateHTML;
    if (hbsTemplate) {
      templateHTML = hbsTemplate;
    } else {
      templateHTML = $(templateSelector).html();
    }
    var target = $(targetSelector);
    var template = Handlebars.compile(templateHTML);
    target.html(template(data));
}


/* ************************************************************************* *\
 *
 * SEARCH
 * THIS IS A MODIFIER VERSION OF STACKTABLE.JS
 *
 * - Only prints content if there's an actual content, else print a divider
 * - added setting 'minColCount', for setting when responsive table should kick in.
 * - adding class 'stacktable-original' to the original table.
 *
 *
 * stacktable.js
 * Author & copyright (c) 2012: John Polacek
 * Dual MIT & GPL license
 *
 * Page: http://johnpolacek.github.com/stacktable.js
 * Repo: https://github.com/johnpolacek/stacktable.js/
 *
 * jQuery plugin for stacking tables on small screens
 *
 \* ************************************************************************* */
(function($) {

    $.fn.stacktable = function(options) {
        var $tables = this,
            defaults = {
                id:'stacktable',
                hideOriginal:false,
                minColCount: 0
            },
            settings = $.extend({}, defaults, options),
            stacktable;

        return $tables.each(function() {

            var $table = $(this);
            var $topRow = $table.find('tr').first();
            var columnCount = $topRow.find('td, th').length;

            if (columnCount > settings.minColCount && $table.hasClass('no-responsive') === false) {

                $table.addClass('stacktable-original');

                var $stacktable = $('<table class="'+settings.id+'"><tbody></tbody></table>');
                if (typeof settings.myClass !== undefined) $stacktable.addClass(settings.myClass);
                var markup = '';

                $table.find('tr').each(function(index) {
                    markup += '<tr>';
                    // for the first row, top left table cell is the head of the table
                    if (index===0) {
                        markup += '<tr><th class="st-head-row st-head-row-main" colspan="2">'+$(this).find('th,td').first().html()+'</th></tr>';
                    }
                    // for the other rows, put the left table cell as the head for that row
                    // then iterate through the key/values
                    else {
                        $(this).find('td').each(function(index) {
                            if (index===0) {

                                if ($(this).html().replace('&nbsp;', '').trim().length > 0) {
                                    markup += '<tr><th class="st-head-row" colspan="2">'+ $(this).html() +'</th></tr>';
                                } else {
                                    markup += '<tr><td class="st-divider" colspan="2"></td></tr>';
                                }

                            } else {
                                if ($(this).html() !== ''){
                                    markup += '<tr>';
                                    if ($topRow.find('td,th').eq(index).html()){
                                        markup += '<td class="st-key">'+$topRow.find('td,th').eq(index).html()+'</td>';
                                    } else {
                                        markup += '<td class="st-key"></td>';
                                    }
                                    markup += '<td class="st-val">'+$(this).html()+'</td>';
                                    markup += '</tr>';
                                }
                            }
                        });
                    }
                });
                $stacktable.append($(markup));
                $table.before($stacktable);
                if (settings.hideOriginal) $table.hide();

            }

        });
    };

}(jQuery));
