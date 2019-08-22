window.onload = function () {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', './table.json', true);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status !== 200) {
            console.log('Error', xhr.status, xhr.statusText);
        } else {
            let tableText = JSON.parse(xhr.responseText);

            let table = document.querySelector('.teachersTable');

            // Отрисовка th в таблице
            let teacherKeys = Object.keys(tableText.teachers[0]);

            for (let i = 0; i < teacherKeys.length; i++) {
                let captions = document.querySelector('.captions');
                let th = document.createElement('th');
                th.innerHTML = teacherKeys[i];
                captions.appendChild(th);
            }

            // Отрисовка ячеек td
            for (let i = 0; i < tableText.teachers.length; i++) {
                let tr = document.createElement('tr');
                tr.classList = 'row';

                for (let k = 0; k < teacherKeys.length; k++) {
                    let td = document.createElement('td');
                    td.innerHTML = tableText.teachers[i][teacherKeys[k]];
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }

            //Навешивание события на кнопку поиска
            let button = document.querySelector('.searchButton');

            button.addEventListener('click', function () {
                let value = document.getElementById("inputSearch").value;
                let allTr = document.querySelectorAll('.row');
                //Массив, который заполнится строками, в которых введенное значение в поиске совпало
                let trArray = [];

                for (let i = 0; i < tableText.teachers.length; i++) {
                    for (let k = 0; k < teacherKeys.length; k++) {
                        let key = tableText.teachers[i][teacherKeys[k]];

                        if (key.indexOf(value) > -1) {
                            trArray.push(allTr[i]);
                        }
                    }
                }
                
                //Если совпадений нет, то выводится соответствующий ответ
                //Иначе строкам добавляется класс hide, который их скроет
                if (trArray.length == 0) {
                    table.setAttribute('class', 'hide');
                    let empty = document.querySelector('.empty');
                    empty.innerHTML = "По Вашему запросу ничего не найдено";
                } else {
                    for (let i = 0; i < allTr.length; i++) {
                        let trClass = allTr[i].getAttribute('class');
                        allTr[i].setAttribute('class', trClass + ' hide');
                    }
                }
                
                //Отрисовка новых строк с совпадениями
                for(let i = 0; i < trArray.length; i++) {
                    trArray[i].classList.remove('hide');
                }
            
            });
        }
    };
};
