import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    // TODO: refactor this with new method called generateBtnMarkup
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return `
      <button class="btn--inline pagination__btn--next" data-goto="${
        this._data.page + 1
      }">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }

    // On last page
    if (this._data.page === numPages && numPages > 1) {
      return `
        <button class="btn--inline pagination__btn--prev" data-goto="${
          this._data.page - 1
        }">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${this._data.page - 1}</span>
        </button>
      `;
    }

    // Other page (not first, not last)
    if (this._data.page < numPages) {
      return `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        this._data.page - 1
      }">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button>

      <button class="btn--inline pagination__btn--next" data-goto="${
        this._data.page + 1
      }">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }

    // Page 1, there are NO other pages
    return '';
  }
}

export default new PaginationView();
