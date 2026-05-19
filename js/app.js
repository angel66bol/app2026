//window.console.log = () => { };
let fechaActualizacion = "Mayo 19, Hrs. 14:00";
let root; let root2; let root3; let root4; let root5; let root6; let root7; let root8; let root9; let root10; let root11; let root12;
let winWidth = $(window).width();
let winHeight = $(window).height();
let monthsValue = {
    "enero": "01",
    "febrero": "02",
    "marzo": "03",
    "abril": "04",
    "mayo": "05",
    "junio": "06",
    "julio": "07",
    "agosto": "08",
    "septiembre": "09",
    "octubre": "10",
    "noviembre": "11",
    "diciembre": "12"
};

let pieData = [
    {
        "category": "Beni",
        "value": "10"
    },
    {
        "category": "Chuquisaca",
        "value": "10"
    },
    {
        "category": "Cochabamba",
        "value": "10"
    },
    {
        "category": "La Paz",
        "value": "10"
    },
    {
        "category": "Oruro",
        "value": "10"
    },
    {
        "category": "Pando",
        "value": "10"
    },
    {
        "category": "Potosí",
        "value": "10"
    },
    {
        "category": "Santa Cruz",
        "value": "5"
    },
    {
        "category": "Tarija",
        "value": "20"
    },
    {
        "category": "Varios Depto",
        "value": "5"
    }
]

const dataX = dataJSON;
let dataJSONtable = dataJSON;

$("#cti").html(dataX.length);
function contarFrecuencia(data, campo) {
    const frecuencias = data.reduce((acc, item) => {
        const valor = item[campo];

        acc[valor] = (acc[valor] || 0) + 1;

        return acc;
    }, {});

    return Object.entries(frecuencias)
        .map(([category, value]) => ({
            category,
            value
        }))
        .sort((a, b) => b.value - a.value);
}

const entidad = contarFrecuencia(dataX, "Entidad del Estado");
const tipoIntervencion = contarFrecuencia(dataX, "Tipo de intervención");

let mes = contarFrecuencia(dataX, "fecha final");
let mes2 = contarFrecuencia(dataX, "fecha final");

let depto = contarFrecuencia(dataX, "DEPTO/MUNIC");
let estrategico = contarFrecuencia(dataX, "ESTRATEGICO/NO ESTRATEGICO");
console.log(entidad);
console.log(tipoIntervencion);
console.log(estrategico);
function orderMonthYear(data) {
    for (let i = 0; i < data.length; i++) {
        arrayMonth = (data[i].category).split("-");
        data[i]["index"] = parseInt(arrayMonth[1].trim() + monthsValue[arrayMonth[0].toLowerCase().trim()]);
    }
    return data;
}

mes = orderMonthYear(mes);
mes.sort((a, b) => a.index - b.index);

console.log(mes)


function orderDeptoMunicipio(data) {
    for (let i = 0; i < data.length; i++) {
        data[i]["index"] = data[i]["value"];
        if (data[i]["category"].trim().toLowerCase() == "sin referencia") {
            data[i]["index"] = 0;
        }
    }
    return data;
}

depto = orderDeptoMunicipio(depto);
depto.sort((a, b) => b.index - a.index);

console.log(depto);

let cardDepto = new Array();
for (let i = 0; i < depto.length; i++) {
    cardDepto.push(depto[i]);
}

console.log(tipoIntervencion[4].value);

$("#proyecto").html(tipoIntervencion[0].value);
$("#programa").html(tipoIntervencion[2].value);
$("#actividad").html(tipoIntervencion[1].value);
$("#norma").html(tipoIntervencion[3].value);
$("#otro").html(tipoIntervencion[4].value);

const montos = contarFrecuencia(dataX, " MONTO RANGOS ");
console.log(montos);

$("#inferior").html(montos[1].value);
$("#sinmonto").html(montos[3].value);
$("#mayor").html(montos[2].value);
$("#regular").html(montos[0].value);

$("#fecha-header").html(fechaActualizacion);
$("#fecha-footer").html(fechaActualizacion);


const pieDataJSON = contarFrecuencia(pieData, " MONTO RANGOS ");
console.log(montos);

const data = [
    {
        "category": "Proyecto de inversión/Obra",
        "value": 121
    },
    {
        "category": "Otro",
        "value": 5
    },
    {
        "category": "Programa",
        "value": 3
    },
    {
        "category": "Actividad",
        "value": 2
    },
    {
        "category": "Decreto/Norma",
        "value": 2
    }
];


function changeChart(type) {
    // 1. Limpiar el root anterior si existe para evitar conflictos de memoria
    if (root) {
        root.dispose();
    }

    // 2. Crear nuevo elemento Root
    root = am5.Root.new("chartdiv");
    // 1. Crear el tema personalizado


    if (type === 'bar') {
        createBarChart();
    } else {
        createPercentChart(type);
    }
}

// function createBarChart() {
//     let chart = root.container.children.push(am5xy.XYChart.new(root, {
//         panX: true,
//         panY: true,
//         wheelX: "panX",
//         wheelY: "zoomX",
//         pinchZoomX: true
//     }));

//     // Crear ejes
//     let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
//     xRenderer.labels.template.setAll({
//         rotation: -90,
//         centerY: am5.p50,
//         centerX: am5.p100,
//         paddingRight: 15
//     });
//     let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
//         categoryField: "category",
//         renderer: xRenderer,
//         tooltip: am5.Tooltip.new(root, {})
//     }));
//     xAxis.data.setAll(entidad);

//     let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
//         renderer: am5xy.AxisRendererY.new(root, {})
//     }));

//     // Crear Serie
//     let series = chart.series.push(am5xy.ColumnSeries.new(root, {
//         name: "Valores",
//         xAxis: xAxis,
//         yAxis: yAxis,
//         valueYField: "value",
//         categoryXField: "category",
//         tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" })
//     }));

//     // Estilizar columnas
//     series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
//     series.columns.template.adapters.add("fill", (fill, target) => {
//         return chart.get("colors").getIndex(series.columns.indexOf(target));
//     });

//     series.data.setAll(entidad);
//     series.appear(1000);
//     chart.appear(1000, 100);
// }

function createBarChart() {
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: true,
        wheelX: "none",
        wheelY: "zoomY", // Cambiamos el zoom al eje Y
        layout: root.verticalLayout
    }));

    chart.get("colors").set("colors", [
        am5.color(0x198754),
        am5.color(0x31A354),
        am5.color(0x74C476),
        am5.color(0xA1D99B),
        am5.color(0xC7E9C0)
    ]);

    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // --- EJE Y (Ahora es el eje de Categorías) ---
    let yRenderer = am5xy.AxisRendererY.new(root, {
        minGridDistance: 30,
        inversed: true // Para que la primera categoría aparezca arriba
    });

    let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: yRenderer,
        tooltip: am5.Tooltip.new(root, {})
    }));

    yAxis.data.setAll(entidad);

    // --- EJE X (Ahora es el eje de Valores) ---
    let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})

    }));

    // --- CREAR SERIE (Intercambiamos X por Y) ---
    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Valores",
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "value",       // Asegúrate que sea X
        categoryYField: "category",  // Asegúrate que sea Y
        tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "left",
            labelText: "{valueX}"
        })

    }));

    //             name: "Series 1",
    //   xAxis: xAxis,
    //   yAxis: yAxis,
    //   valueXField: "value",
    //   categoryYField: "network",
    //   tooltip: am5.Tooltip.new(root, {
    //     pointerOrientation: "left",
    //     labelText: "{valueX}"
    //   })

    // Estilizar columnas
    series.columns.template.setAll({
        cornerRadiusTR: 5,
        cornerRadiusBR: 5,
        strokeOpacity: 0,
        interactive: true,
    });

    series.columns.template.setAll({
        interactive: true, // Permite que la barra "sienta" el mouse
        tooltipText: "{categoryX}: [bold]{valueY}[/]" // Configuración extra del texto
    });

    series.columns.template.adapters.add("fill", (fill, target) => {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.data.setAll(entidad);
    series.appear(1000);
    chart.appear(1000, 100);
}

function createPercentChart(type) {
    let chart = root.container.children.push(am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: type === 'donut' ? am5.percent(50) : 0
    }));

    let series = chart.series.push(am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        alignLabels: false
    }));

    series.labels.template.setAll({ textType: "circular", centerX: 0, centerY: 0 });
    series.data.setAll(data);

    series.appear(1000, 100);
}

// changeChart('bar');
function changeChart2(type) {
    if (root2) {
        root2.dispose();
    }

    root2 = am5.Root.new("chartdiv2");
    root2.setThemes([am5themes_Animated.new(root2)]);

    if (type === 'bar') {
        createBarChart2();
    } else {
        createPercentChart2(type);
    }
}

function createBarChart2() {
    let chart = root2.container.children.push(am5xy.XYChart.new(root2, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
    }));
    // chart.get("colors").set("colors", [
    //     am5.color(0x095256),
    //     am5.color(0x087f8c),
    //     am5.color(0x5aaa95),
    //     am5.color(0x86a873),
    //     am5.color(0xbb9f06)
    // ]);

    var cursor = chart.set("cursor", am5xy.XYCursor.new(root2, {}));
    cursor.lineY.set("visible", false);

    // Crear ejes
    let xRenderer = am5xy.AxisRendererX.new(root2, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15
    });
    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root2, {
        categoryField: "category",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root2, {})
    }));
    xAxis.data.setAll(tipoIntervencion);

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root2, {
        renderer: am5xy.AxisRendererY.new(root2, {})
    }));

    // Crear Serie
    let series = chart.series.push(am5xy.ColumnSeries.new(root2, {
        name: "Valores",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root2, { labelText: "{valueY}" })
    }));
    series.columns.template.setAll({
        interactive: true,
        tooltipText: "{categoryX}: [bold]{valueY}[/]"
    });

    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
    series.columns.template.adapters.add("fill", (fill, target) => {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.data.setAll(tipoIntervencion);
    series.appear(1000);
    chart.appear(1000, 100);
}

function changeChart3(type) {
    // 1. Limpiar el root anterior si existe para evitar conflictos de memoria
    if (root3) {
        root3.dispose();
    }

    // 2. Crear nuevo elemento Root
    root3 = am5.Root.new("chartdiv3");

    // 3. Aplicar tema animado
    root3.setThemes([am5themes_Animated.new(root3)]);

    if (type === 'bar') {
        createBarChart3();
    } else {
        createPercentChart(type);
    }
}

function createBarChart3() {
    let chart = root3.container.children.push(am5xy.XYChart.new(root3, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
    }));

    var cursor = chart.set("cursor", am5xy.XYCursor.new(root3, {}));
    cursor.lineY.set("visible", false);


    // Crear ejes
    let xRenderer = am5xy.AxisRendererX.new(root3, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15
    });
    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root3, {
        categoryField: "category",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root3, {})
    }));
    xAxis.data.setAll(mes);

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root3, {
        renderer: am5xy.AxisRendererY.new(root3, {})
    }));

    // Crear Serie
    let series = chart.series.push(am5xy.ColumnSeries.new(root3, {
        name: "Valores",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root3, { labelText: "{valueY}" })
    }));

    // Estilizar columnas
    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
    series.columns.template.adapters.add("fill", (fill, target) => {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.data.setAll(mes);
    series.appear(1000);
    chart.appear(1000, 100);
}

function changeChart11(type) {
    // 1. Limpiar el root anterior si existe para evitar conflictos de memoria
    if (root11) {
        root11.dispose();
    }

    // 2. Crear nuevo elemento Root
    root11 = am5.Root.new("chartdiv11");

    // 3. Aplicar tema animado
    root11.setThemes([am5themes_Animated.new(root11)]);

    if (type === 'bar') {
        createBarChart11();
    } else {
        createPercentChart(type);
    }
}

function createBarChart11() {
    let chart = root11.container.children.push(am5xy.XYChart.new(root11, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
    }));

    chart.get("colors").set("colors", [
        am5.color(0x198754),
        am5.color(0x31A354),
        am5.color(0x74C476),
        am5.color(0xA1D99B),
        am5.color(0xC7E9C0)
    ]);

    var cursor = chart.set("cursor", am5xy.XYCursor.new(root11, {}));
    cursor.lineY.set("visible", false);


    // Crear ejes
    let xRenderer = am5xy.AxisRendererX.new(root11, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15
    });
    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root11, {
        categoryField: "category",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root11, {})
    }));
    xAxis.data.setAll(mes2);

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root11, {
        renderer: am5xy.AxisRendererY.new(root11, {})
    }));

    // Crear Serie
    let series = chart.series.push(am5xy.ColumnSeries.new(root11, {
        name: "Valores",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root11, { labelText: "{valueY}" })
    }));

    // Estilizar columnas
    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
    series.columns.template.adapters.add("fill", (fill, target) => {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.data.setAll(mes2);
    series.appear(1000);
    chart.appear(1000, 100);
}

function changeChart8(type) {
    // 1. Limpiar el root anterior si existe para evitar conflictos de memoria
    if (root8) {
        root8.dispose();
    }

    // 2. Crear nuevo elemento Root
    root8 = am5.Root.new("chartdiv8");

    // 3. Aplicar tema animado
    root8.setThemes([am5themes_Animated.new(root8)]);

    if (type === 'bar') {
        createBarChart8();
    } else {
        createPercentChart(type);
    }
}

function createBarChart8() {
    console.log(estrategico);
    let chart = root8.container.children.push(am5xy.XYChart.new(root8, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
    }));

    chart.get("colors").set("colors", [
        am5.color(0x198754),
        am5.color(0x31A354),
        am5.color(0x74C476),
        am5.color(0xA1D99B),
        am5.color(0xC7E9C0)
    ]);

    var cursor = chart.set("cursor", am5xy.XYCursor.new(root8, {}));
    cursor.lineY.set("visible", false);


    // Crear ejes
    let xRenderer = am5xy.AxisRendererX.new(root8, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15
    });
    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root8, {
        categoryField: "category",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root8, {})
    }));
    xAxis.data.setAll(estrategico);

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root8, {
        renderer: am5xy.AxisRendererY.new(root8, {}),
        min: 0
    }));

    // Crear Serie
    let series = chart.series.push(am5xy.ColumnSeries.new(root8, {
        name: "Valores",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root8, { labelText: "{valueY}" })
    }));

    // Estilizar columnas
    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
    series.columns.template.adapters.add("fill", (fill, target) => {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.data.setAll(estrategico);
    series.appear(1000);
    chart.appear(1000, 100);

}

function changeChart9(type) {
    // 1. Limpiar el root anterior si existe para evitar conflictos de memoria
    if (root) {
        root.dispose();
    }

    // 2. Crear nuevo elemento Root
    root = am5.Root.new("chartdiv");

    // 3. Aplicar tema animado
    root.setThemes([am5themes_Animated.new(root)]);

    if (type === 'bar') {
        createBarChart9();
    } else {
        createPercentChart(type);
    }
}

function createBarChart9() {
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
    }));

    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);


    // Crear ejes
    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15
    });
    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
    }));
    xAxis.data.setAll(entidad);

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
    }));

    // Crear Serie
    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Valores",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" })
    }));

    // Estilizar columnas
    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
    series.columns.template.adapters.add("fill", (fill, target) => {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.data.setAll(entidad);
    series.appear(1000);
    chart.appear(1000, 100);

}


function createBarChart4() {
    if (root4) {
        root4.dispose();
    }

    // 2. Crear nuevo elemento Root
    root4 = am5.Root.new("chartdiv4");

    // 3. Aplicar tema animado
    root4.setThemes([am5themes_Animated.new(root)]);
    let chart = root4.container.children.push(am5xy.XYChart.new(root4, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
    }));

    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);


    // Crear ejes
    let xRenderer = am5xy.AxisRendererX.new(root4, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15
    });
    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root4, {
        categoryField: "category",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root4, {})
    }));
    xAxis.data.setAll(depto);

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root4, {
        renderer: am5xy.AxisRendererY.new(root4, {})
    }));

    // Crear Serie
    let series = chart.series.push(am5xy.ColumnSeries.new(root4, {
        name: "Valores",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root4, { labelText: "{valueY}" })
    }));

    // Estilizar columnas
    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
    series.columns.template.adapters.add("fill", (fill, target) => {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.data.setAll(depto);
    series.appear(1000);
    chart.appear(1000, 100);
}

function createPercentChart5(type) {

    console.log(depto)

    if (root10) {
        root10.dispose();
    }

    // 2. Crear nuevo elemento Root
    root10 = am5.Root.new("chartdiv10");

    // 3. Aplicar tema animado
    root10.setThemes([am5themes_Animated.new(root10)]);
    let chart = root10.container.children.push(am5percent.PieChart.new(root10, {
        layout: root10.verticalLayout,
        // innerRadius: type === 'donut' ? am5.percent(50) : 0
    }));

    let series = chart.series.push(am5percent.PieSeries.new(root10, {
        valueField: "value",
        categoryField: "category",
        colors: am5.ColorSet.new(root10, {
            colors: [
                am5.color(0x198754),
                am5.color(0x31A354),
                am5.color(0x74C476),
                am5.color(0xA1D99B),
                am5.color(0xC7E9C0)
            ]
        })
        // alignLabels: false
    }));

    // //series.labels.template.setAll({ textType: "circular", centerX: 0, centerY: 0 });
    // series.labels.template.setAll({
    //     // Usamos formatNumber para asegurar que el motor de amCharts procese el dato
    //     text: "{category}: {value} ({percent.formatNumber('#.0')}% )",
    //     radius: 10
    // });

    series.slices.template.setAll({
        // Esto sobreescribe el comportamiento por defecto del hover
        tooltipText: "{category}: {value}"
    });
    series.data.setAll(depto);


    // var legend = chart.children.push(am5.Legend.new(root5, {
    //     centerX: am5.percent(50),
    //     x: am5.percent(50),
    //     marginTop: 15,
    //     marginBottom: 15
    // }));

    // legend.data.setAll(series.dataItems);

    // Aparecer con animación
    series.appear(1000, 100);
}

if (winWidth > 768) {
    changeChart('bar');
    $("#chartdiv").css("height", 780);
}
else {
    changeChart9('bar');
    $("#chartdiv").css("height", 800);
}
// changeChart2('bar');
// changeChart3('bar');
changeChart11('bar');

// createBarChart4();
createPercentChart5('pie');


changeChart8('bar');

$(document).ready(function () {
    // 2. Insertar los datos en el cuerpo de la tabla
    const tbody = $('#contenidoTabla');



    let montoTotal = 0
    dataJSONtable.forEach(item => {
        const fechaTxt = item["Fecha tentativa de la presentación"];
        let orden = "";

        if (fechaTxt && fechaTxt.includes('/')) {
            const p = fechaTxt.split('/');
            const dia = p[0].padStart(2, '0');
            const mes = p[1].padStart(2, '0');
            const anio = p[2];

            orden = anio + mes + dia;
        }
        let ordenMonto = 10000000000;
        console.log(item);
        let monto = item["MONTOS"];
        console.log(monto)
        if (monto.trim() != "Sin Referencia") {
            console.log(monto);
            monto = item["MONTOS"].replaceAll(",", ".");
            ordenMonto = parseInt(monto.replaceAll(".", ""));
            console.log(monto, ordenMonto)
            montoTotal += ordenMonto;
        }
        tbody.append(`
                    <tr>
                        <td>${item["Entidad del Estado"]}</td>
                        <td>${item["Tipo de intervención"]}</td>
                        <td>${item["Descripción breve de la intervención (Proyecto,  Programa,  Actividad u otro)"]}</td>
                        <td data-order="${orden}">${item["Fecha tentativa de la presentación"]}</td>
                        <td data-order="${ordenMonto}">${monto}</td>

                        <td>${item["DEPTO/MUNIC"]}</td>
                       
                    </tr>
                `);
    });
    console.log(montoTotal);

    $('#miTabla').DataTable({
        // columnDefs: [
        //     { type: 'num', targets: 4 }
        //     // 4 es el índice de la columna de montos (empezando desde 0)
        // ],
        language: {
            processing: "Procesando...",
            search: "Buscar:",
            lengthMenu: "Mostrar _MENU_ registros",
            info: "Mostrando del registro _START_ al _END_ de un total de _TOTAL_ registros",
            infoEmpty: "Mostrando 0 de 0 registros",
            infoFiltered: "(filtrado de un total de _MAX_ registros)",
            loadingRecords: "Cargando registros...",
            zeroRecords: "No se encontraron resultados",
            emptyTable: "No hay datos disponibles en la tabla",
            paginate: {
                first: "Primero",
                previous: "Anterior",
                next: "Siguiente",
                last: "Último"
            },
            aria: {
                sortAscending: ": Activar para ordenar la columna de manera ascendente",
                sortDescending: ": Activar para ordenar la columna de manera descendente"
            }
        },
        "responsive": true
    });

    let dataJSONtableCH = dataCH;

    const tbodyCH = $('#contenidoTablaCH');
    dataJSONtableCH.forEach(item => {
        tbodyCH.append(`
                    <tr>
                        <td>${item["DESCRIPCIÓN DE LA INTERVENCIÓN"]}</td>
                        <td>${item["MONTOS"]}</td>
                        <td>${item["MES"]}</td>
                        <td>${item["DEPTO"]}</td>
                        <td>${item["MUNICIPIO"]}</td>                       
                    </tr>
                `);
    });

    $('#miTablaCH').DataTable({
        language: {
            processing: "Procesando...",
            search: "Buscar:",
            lengthMenu: "Mostrar _MENU_ registros",
            info: "Mostrando del registro _START_ al _END_ de un total de _TOTAL_ registros",
            infoEmpty: "Mostrando 0 de 0 registros",
            infoFiltered: "(filtrado de un total de _MAX_ registros)",
            loadingRecords: "Cargando registros...",
            zeroRecords: "No se encontraron resultados",
            emptyTable: "No hay datos disponibles en la tabla",
            paginate: {
                first: "Primero",
                previous: "Anterior",
                next: "Siguiente",
                last: "Último"
            },
            aria: {
                sortAscending: ": Activar para ordenar la columna de manera ascendente",
                sortDescending: ": Activar para ordenar la columna de manera descendente"
            }
        },

        paging: false,
        responsive: true,
        info: false,
        searching: false,
        ordering: false
    });


    // const datos = [{ "id": "0", "desc": "LA PAZ", "monto": "MONTOS" }, { "id": "1", "desc": "CONST. ENLOSETADO AV. ILLIMANI D-8 (CIUDAD EL ALTO) - PROGRAMA MUJERES LUCHADORAS", "monto": " 2.913.198 " }, { "id": "2", "desc": "CONST. ENLOSETADO DE CALLE Y AVENIDAS EN EL DISTRITO 12 (CIUDAD EL ALTO) - PROGRAMA MUJERES LUCHADORAS", "monto": " 2.554.390 " }, { "id": "3", "desc": "CONST. ENLOSETADO DE CALLES Y AVENIDAS EN LAS URBANIZACIONES ALTO CHIJINI U.V. D Y SENOR DE EXALTACION A DISTRITO 12 ( CIUDAD EL ALTO) - PROGRAMA MUJERES LUCHADORAS", "monto": " 2.473.114 " }, { "id": "10", "desc": "CONST. ENLOSETADO AV.4 DE ENERO, AV. DIANA SPENCER Y AV. CUBAY (CIUDAD DEL ALTO) - PROGRAMA MUJERES LUCHADORAS", "monto": " 1.455.766 " }, { "id": "0", "desc": "COCHABAMBA", "monto": "MONTOS" }, { "id": "1", "desc": "Proyecto: CONST. PLANTA DE GENERACIÓN HIDROELÉCTRICA IVIRIZU\"...", "monto": " 674.943.235 " }, { "id": "2", "desc": "CONST. ADUCCION 1 PTAP JOVE RANCHO TIQUIPAYA - COCHABAMBA - SACABA\n", "monto": " 280.931.669 " }, { "id": "3", "desc": "CONST. SISTEMA DE AGUA POTABLE SACABA", "monto": " 76.173.124 " }, { "id": "10", "desc": "CONST. REPRESA PUKA CHULO - LAGUNA GRANDE, (RAQAYPAMPA)", "monto": " 990.575 " }, { "id": "0", "desc": "BENI", "monto": "MONTOS" }, { "id": "1", "desc": "CONST. PLANTA DE TRATAMIENTO DE AGUA POTABLE CIUDAD TRINIDAD - BENI", "monto": " 184.683.254 " }, { "id": "0", "desc": "ORURO", "monto": "MONTOS" }, { "id": "1", "desc": "MEJ. Y AMPL. DEL SIST. DE AGUA POTABLE PARA RECIENTES ASENTAMIENTOS URB. DE LA CIUDAD DE ORURO (APRAUR) FASE I\n", "monto": " 98.609.475 " }, { "id": "2", "desc": "IMPLEM. DE LA INDUSTRIA DE CAMéLIDOS DE ORURO", "monto": " 74.327.694 " }, { "id": "0", "desc": "PANDO", "monto": "MONTOS" }, { "id": "1", "desc": "Entrega Definitiva (inaguracion) del proyecto \"Construcción e Implementación...", "monto": " 30.561.089 " }, { "id": "2", "desc": "PROGRAMA DE APOYO A LA GESTIÓN DE RIESGOS ANTE EVENTOS ADVERSOS DEL CLIMA...", "monto": " 36.000.000 " }, { "id": "0", "desc": "POTOSI", "monto": "MONTOS" }, { "id": "1", "desc": "AMPL. DEL SISTEMA DE AGUA POTABLE VILLAZON POTOSI", "monto": " 66.149.123 " }, { "id": "0", "desc": "SUCRE", "monto": "MONTOS" }, { "id": "1", "desc": "Proyecto: “CONST. ELECTRIFICACION RURAL CULPINA...", "monto": " 8.014.554 " }, { "id": "2", "desc": "CONST. ELECTRIFICACIÓN RURAL DISTRITO SUPAS MUNICIPIO DE VILLAS CHARCAS...", "monto": " 6.446.956 " }, { "id": "7", "desc": "AMPL. DE SISTEMA DE RIEGO SAN JOSE DE MOLLES...", "monto": " 1.575.944 " }, { "id": "8", "desc": "CONST. PUENTE VEHICULAR COMUNIDAD SOCABON (VILLA SERRANO)", "monto": " 1.103.912 " }, { "id": "9", "desc": "CONST. PUENTE VEHICULAR SUCUMAYU, COMUNIDAD PALAJLA", "monto": " 1.080.344 " }, { "id": "0", "desc": "TARIJA", "monto": "MONTOS" }, { "id": "1", "desc": "IMPLEM. OBRAS DE CONTROL HIDRAULICO EN ZONAS DE RIESGO...", "monto": " 6.285.375 " }];
    const datos = dataRanking;
    const tablasAgrupadas = [];
    let grupoActual = null;

    datos.forEach(item => {
        if (item.id === "0") {
            // Si ya existía un grupo activo, lo guardamos antes de abrir el siguiente
            if (grupoActual) {
                tablasAgrupadas.push(grupoActual);
            }
            // Creamos una nueva estructura de tabla usando el valor de 'desc' como título
            grupoActual = {
                titulo: item.desc,
                filas: []
            };
        } else {
            // Si no es "0", agregamos la fila al grupo actual
            if (grupoActual) {
                grupoActual.filas.push(item);
            }
        }
    });
    if (grupoActual) tablasAgrupadas.push(grupoActual);

    const $contenedor = $('#contenedor-tablas');

    tablasAgrupadas.forEach((tabla, index) => {
        const tablaId = `tabla-dept-${index}`;

        const tablaHtml = `
        <div class="contenedor-tabla-individual" style="margin-bottom: 40px;">
            <h3>${tabla.titulo}</h3>
            <table id="${tablaId}" class="display table-departamento" style="width:100%">
                <thead>
                    <tr >
                        <th style="width:80px">RANKING</th>
                        <th>Descripción</th>
                        <th style="width:100px">Monto (Bs.)</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    `;

        $contenedor.append(tablaHtml);

        $(`#${tablaId}`).DataTable({
            data: tabla.filas,
            order: [], // Mantiene el orden exacto del JSON segregado
            columns: [
                { data: 'id' },
                { data: 'desc' },
                { data: 'monto' }
            ],
            language: {
                processing: "Procesando...",
                search: "Buscar:",
                lengthMenu: "Mostrar _MENU_ registros",
                info: "Mostrando del registro _START_ al _END_ de un total de _TOTAL_ registros",
                infoEmpty: "Mostrando 0 de 0 registros",
                infoFiltered: "(filtrado de un total de _MAX_ registros)",
                loadingRecords: "Cargando registros...",
                zeroRecords: "No se encontraron resultados",
                emptyTable: "No hay datos disponibles en la tabla",
                paginate: {
                    first: "Primero",
                    previous: "Anterior",
                    next: "Siguiente",
                    last: "Último"
                },
                aria: {
                    sortAscending: ": Activar para ordenar la columna de manera ascendente",
                    sortDescending: ": Activar para ordenar la columna de manera descendente"
                }
            },
            paging: false,
            responsive: true,
            info: false,
            searching: false,
            ordering: false

        });
    });

});