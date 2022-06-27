const options = [
    {value: 1, label: 'Audi', group: 'Германия'},
    {value: 2, label: 'BMW', group: 'Германия'},
    {value: 3, label: 'Citroen', group: 'Франция'},
    {value: 4, label: 'Ford', group: 'США'},
    {value: 5, label: 'Honda', group: 'Япония'},
    {value: 6, label: 'Jaguar', group: 'Великобритания'},
    {value: 7, label: 'Land Rover', group: 'Великобритания'},
    {value: 8, label: 'Mini', group: 'Великобритания'},
    {value: 9, label: 'Nissan', group: 'Япония'},
    {value: 10, label: 'Toyota', group: 'Япония'},
    {value: 11, label: 'Volvo', group: 'Швеция'}
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

        // this.itemsHTML = this.options.map(({value, label}) => {
        //     return `<li data-id=${value}>${label}</li>`
        // })

        this.itemsHTML = this.initGroup(this.options).map(([key, items]) => {
            if(key) {
                const groupList = items.map(({value, label}) => `<li data-id=${value}>${label}</li>`).join('')
                return `<li style="padding-left: 25px; color: gray"><span>${key}</span>${groupList}</li>`
                }
            else {
                return items.map(({value, label}) => `<li data-id=${value}>${label}</li>`).join('')
            }

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

    initGroup(items) {
        const group = new Map()
        items.forEach(item => {
            if (!group.has(item.group)) {
                group.set(item.group, [item])
            } else {
                group.set(item.group, [...group.get(item.group), item])
            }
        })
        return Array.from(group.entries())

    }
}


const customSelect = new DropDown('.select', options)

