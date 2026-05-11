
let itemsData = new Array();
let root;

const container = document.getElementById('menuContainer');
const search = document.getElementById('searchInput');
const counter = document.getElementById('counter');
const myModal = new bootstrap.Modal(document.getElementById('imageModal'));

// 2. FUNCIÓN PARA DIBUJAR EL MENÚ
function render(list) {
    container.innerHTML = '';
    counter.innerText = `Mostrando ${list.length} de ${itemsData.length} prioridades`;

    list.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-row bg-white shadow-sm mb-2';
        div.innerHTML = `
            <span class="item-number">${item.code}</span>
            <span class="item-name">${item.name}</span>
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"></path></svg>
        `;

        div.onclick = () => {
            document.getElementById('mTitle').innerText = item.name;
            // document.getElementById('modalImg').src = item.img;
            itemSelected= item.id;
            myModal.show();
            document.getElementById("chartdiv").innerHTML="";
            setTimeout(function(){
                showGantt(itemSelected);
            }, 500)
        };

        container.appendChild(div);
    });
}

// 3. EVENTO DE BÚSQUEDA
search.oninput = (e) => {
    const val = e.target.value.toLowerCase();
    const filtered = itemsData.filter(i => i.name.toLowerCase().includes(val));
    render(filtered);
};

function showGantt(index) {
    dataGantt = data[index];
    console.log(dataGantt);
    let categoryData = new Array();
    let seriesData = new Array();
    let counterPrioridad = 0;
    let counterRowGantt = 0;
    console.log(dataGantt.etapa.length);

    for (let i = 0; i < dataGantt.etapa.length; i++) {
        categoryData.push({
            name: dataGantt.etapa[i].name,
            id: "gantt_" + counterRowGantt,

        });
        seriesData.push(
            {
                "category": "gantt_" + i,
                duration: 1,
                progress: 0,
                id: "gantt_" + counterRowGantt

            }
        );

        parentID = counterRowGantt;
        counterRowGantt++;
        console.log(dataGantt.etapa[i].sub.length);
        for (let k = 0; k < dataGantt.etapa[i].sub.length; k++) {

            categoryData.push({
                name: dataGantt.etapa[i].sub[k].name,
                id: "gantt_" + counterRowGantt,
                parentId: "gantt_" + parentID,
            });
            seriesData.push(
                {
                    "category": "gantt_" + counterRowGantt,
                    start: dataGantt.etapa[i].sub[k].fi,
                    end: dataGantt.etapa[i].sub[k].ff,
                    duration: 1,
                    progress: 0,
                    id: "gantt_" + counterRowGantt,

                }
            );
            counterRowGantt++;
        }
        // counterPrioridad++;
    }
    console.log(categoryData);
    console.log(seriesData);

    if (root) {
  root.dispose();
}

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    root = am5.Root.new("chartdiv");
    root.locale = am5locales_es_ES
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Create Gantt chart
    // https://www.amcharts.com/docs/v5/charts/gantt/
    var gantt = root.container.children.push(am5gantt.Gantt.new(root, {
        editable: false
    }));
    gantt.addButton.hide(0);
    gantt.editButton.hide(0);

    // var categoryData = [ {
    //     name: "Design",
    //     id: "gantt_1"
    // }, {
    //     name: "Review",
    //     id: "gantt_2",
    //     parentId: "gantt_1",
    // }, {
    //     name: "User tests",
    //     id: "gantt_3",
    //     parentId: "gantt_1",
    // }, {
    //     name: "Programming",
    //     id: "gantt_4"
    // }, {
    //     name: "Task delegation",
    //     id: "gantt_5",
    //     parentId: "gantt_4",
    // }, {
    //     name: "Coding",
    //     id: "gantt_6",
    //     parentId: "gantt_4",
    // }, {
    //     name: "Testing",
    //     id: "gantt_7",
    //     parentId: "gantt_4",
    // }, {
    //     name: "Deploying",
    //     id: "gantt_8",
    //     parentId: "gantt_4",
    // }, {
    //     name: "Testing",
    //     id: "gantt_9"
    // }, {
    //     name: "Phase 1",
    //     id: "gantt_10",
    //     parentId: "gantt_9",
    // }, {
    //     name: "Phase 2",
    //     id: "gantt_11",
    //     parentId: "gantt_9",
    // }, {
    //     name: "Phase 3",
    //     id: "gantt_12",
    //     parentId: "gantt_9",
    // }, {
    //     name: "End",
    //     id: "gantt_15"
    // }];

    // var seriesData = [{
    //     "category": "gantt_1",
    //     duration: 1,
    //     progress: 0,
    //     id: "gantt_1",

    // }, {
    //     "category": "gantt_2",
    //     start: 1758488400000,
    //     duration: 1,
    //     progress: 0,
    //     id: "gantt_2",
    // }, {
    //     "category": "gantt_3",
    //     start: 1758229200000,
    //     duration: 1,
    //     progress: 0,
    //     id: "gantt_3",
    // }, {
    //     "category": "gantt_4",
    //     duration: 1,
    //     progress: 0,
    //     id: "gantt_4",
    //     start: 1758229200000,
    // }, {
    //     "category": "gantt_5",
    //     start: 1758488400000,
    //     duration: 1,
    //     progress: 0,
    //     id: "gantt_5",
    // }, {
    //     "category": "gantt_6",
    //     start: 1758834000000,
    //     duration: 1,
    //     progress: 1,
    //     id: "gantt_6",
    // }, {
    //     "category": "gantt_7",
    //     start: 1759179600000,
    //     duration: 1,
    //     progress: 1,
    //     id: "gantt_7",
    // }, {
    //     "category": "gantt_8",
    //     start: 1759266000000,
    //     end: new Date(2025, 10, 10).getTime(),
    //     duration: 8,
    //     progress: 1,
    //     id: "gantt_8"
    // }, {
    //     "category": "gantt_9",
    //     duration: 1,
    //     progress: 1,
    //     id: "gantt_9",
    // }, {
    //     "category": "gantt_10",
    //     start: 1759438800000,
    //     duration: 1,
    //     progress: 1,
    //     id: "gantt_10",
    // }, {
    //     "category": "gantt_11",
    //     start: 1759698000000,
    //     duration: 1,
    //     progress: 1,
    //     id: "gantt_11",
    // }, {
    //     "category": "gantt_12",
    //     start: 1759784400000,
    //     duration: 1,
    //     progress: 1,
    //     id: "gantt_12"
    // },];
    

    var markedDates = [1758661200000, 1759352400000];
    gantt.yAxis.data.setAll(categoryData);
    gantt.series.data.setAll(seriesData);
    gantt.appear();

}

// 4. EJECUCIÓN INICIAL (Carga los 34 al abrir)
window.onload = () => {
    for (let i = 0; i < data.length; i++) {
       itemsData.push(
        { id: i, name: data[i].name, code: data[i].code,  },
       )
        
    }
    render(itemsData);
};