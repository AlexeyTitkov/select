const options = [
    {value: 1, label: 'Audi'},
    {value: 2, label: 'BMW'},
    {value: 3, label: 'Citroen'},
    {value: 4, label: 'Ford'},
    {value: 5, label: 'Honda'},
    {value: 6, label: 'Jaguar'},
    {value: 7, label: 'Land Rover'},
    {value: 8, label: 'Mini'},
    {value: 9, label: 'Nissan'},
    {value: 10, label: 'Toyota'},
    {value: 11, label: 'Volvo'}
]

class DropDown {
    constructor(selector, options) {
        this.$select = document.querySelector(selector);
        this.options = options;
        this.defaultLabel = document.querySelector('.select__label').innerHTML = 'Choose a car brand:';
        this.$label = document.querySelector('.select__label');
        this.$dropDown = document.querySelector('.select__drop-down')
        this.$select.addEventListener('click', (e) => {
            if (e.target.classList.contains('select__label')) {
                if (this.$select.classList.contains('active')) {
                    this.close()
                } else {
                    this.open()
                }
            } else {
                if (e.target.tagName.toLowerCase() === 'li') {
                    this.selectedItem(+e.target.dataset.id)
                }
            }
        })
        this.itemsHTML = this.options.map(({value, label}) => {
            return `<li data-id=${value}>${label}</li>`
        }).join('')
        this.$dropDown.insertAdjacentHTML("afterbegin", this.itemsHTML)
    }
    selectedItem(id) {
        this.$label.innerHTML = this.options.find(item => item.value === id).label
        this.close()
    }
    open() {
        this.$select.classList.add('active')
    }
    close() {
        this.$select.classList.remove('active')
    }
}

const customSelect = new DropDown('.select', options)

