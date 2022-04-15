(function () {
  function createTodoTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title
    return appTitle
  }

  function createTodoForm() {
  let form = document.createElement('form')
  let input = document.createElement('input')
  let divBtn = document.createElement('div')
  let btn = document.createElement('button')

  form.classList.add('input-group', 'mb-3')
  input.classList.add('form-control')
  input.placeholder = 'Введите новое дело'
  divBtn.classList.add('input-group-append')
  btn.classList.add('input-group-div-btn', 'btn-primary')
  btn.textContent = 'Добавить'
  btn.disabled = true

  divBtn.append(btn)
  form.append(input)
  form.append(divBtn)

  input.addEventListener('input', function() {
    if(input.value !== '') {
      btn.disabled = false
    } else {
      btn.disabled = true
    }
  })

  return {
    form,
    input,
    btn}
  }

  let items = []

  function createTodoList () {
  let todoList = document.createElement('ul')
  todoList.classList.add('list-group')
  return todoList
  }

  function createTodoItem (obj, title) {
  let item = document.createElement('li')
  let btnGroup = document.createElement('div')
  let btnYes = document.createElement('button')
  let btnRemove = document.createElement('button')

  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
  item.textContent = obj.name

  if(obj.done == true) {
    item.classList.add('list-group-item-succes')
  } else {
    item.classList.remove('list-group-item-succes')
  }

  btnGroup.classList.add('btn-group', 'btn-group-sm')
  btnYes.classList.add('btn', 'btn-success')
  btnYes.textContent = 'Done'
  btnRemove.classList.add('btn', 'btn-danger')
  btnRemove.textContent = 'Delete'

  btnGroup.append(btnYes)
  btnGroup.append(btnRemove)
  item.append(btnGroup)

  btnYes.addEventListener('click' , function() {
    item.classList.toggle('list-group-item-success')
    obj.done = !obj.done
    localStorage.setItem(title, JSON.stringify(items))
  })
    btnRemove.addEventListener('click', function() {
    if(confirm("Вы уверены?")) {
      item.remove();
      let removeItems = items.filter(item => item.name != obj.name)
      console.log(removeItems)
      localStorage.setItem(title, JSON.stringify(removeItems))
    }
  })

  return {
    obj,
    item,
    btnYes,
    btnRemove,
  }
  }

  function createTodoApp (container, title = 'Список дел', todos, todosMom, todosDad, array = [
    {name: "Почистить зубы", done: true},
    {name: "Позавтракать", done: false}
    ]) {

    items = localStorage.getItem(title) ? JSON.parse(localStorage.getItem(title)) : array
    localStorage.setItem(title, JSON.stringify(items))

    let todoCreateTitle = createTodoTitle(title)
    let todoCreateForm = createTodoForm()
    let todoCreateList = createTodoList()

    container.append(todoCreateTitle)
    container.append(todoCreateForm.form)
    container.append(todoCreateList)

      items.forEach(function(elem) {
        let todoCreateItem = createTodoItem(elem, title)
        todoCreateList.append(todoCreateItem.item)
        if(elem.done == true) {
          todoCreateItem.item.classList.add('list-group-item-success')
       } else {
          todoCreateItem.item.classList.remove('list-group-item-success')
        }
      })

    todoCreateForm.form.addEventListener('submit', function(e) {
      e.preventDefault();
      if(!todoCreateForm.input.value) {
        return
      }

      let item = {name: todoCreateForm.input.value, done: false}
      let todoItem = createTodoItem(item, title)
      items.push(item)
      todoCreateList.append(todoItem.item)
      localStorage.setItem(title, JSON.stringify(items))
      todoCreateForm.input.value = ""
      todoCreateForm.btn.disabled = true
    })
  }
  window.createTodoApp = createTodoApp;
})();
