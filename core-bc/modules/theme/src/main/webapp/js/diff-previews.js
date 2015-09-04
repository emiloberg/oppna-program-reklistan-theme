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

      var htmlPublished = $('#published-target').html();
      var htmlDraft= $('#draft-target').html();
      var articleDiff;

      if (htmlDraft === htmlPublished) {
        articleDiff = '<p class="no-diffs">Inga ändringar från publicerad version</p>';
      } else {
        articleDiff = htmldiff(htmlPublished, htmlDraft);
      }
      $('#diff-target').html(articleDiff);

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

