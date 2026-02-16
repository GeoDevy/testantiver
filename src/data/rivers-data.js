/**
 * 10 Major rivers of India with sampled waypoint coordinates
 * Each river has an array of [lat, lng] points along its course
 */
const INDIAN_RIVERS = [
    {
        id: "ganga",
        name: "Ganga",
        origin: "Gangotri Glacier, Uttarakhand",
        length: 2525,
        studyArea: {
            description: "The study area spans a 120 km stretch of the Ganga riverbank near Prayagraj, covering active floodplains, meander bends, and riparian zones. This reach is significant for its sediment dynamics and seasonal channel migration.",
            bounds: { north: 25.60, south: 25.20, east: 82.10, west: 81.60 },
            center: [25.43, 81.85],
        },
        coordinates: [
            [30.99, 78.93], [29.95, 78.16], [28.68, 77.70], [27.18, 79.41],
            [26.85, 80.91], [25.43, 81.85], [25.32, 83.01], [25.60, 84.86],
            [25.37, 86.13], [24.80, 87.95], [23.55, 88.40], [22.57, 88.36],
        ],
    },
    {
        id: "yamuna",
        name: "Yamuna",
        origin: "Yamunotri Glacier, Uttarakhand",
        length: 1376,
        studyArea: {
            description: "Focus reach along the Yamuna floodplain near Agra–Etawah, monitoring bank erosion, sand bar formation, and riparian land-use transitions.",
            bounds: { north: 27.30, south: 26.60, east: 79.20, west: 78.00 },
            center: [26.95, 78.60],
        },
        coordinates: [
            [31.01, 78.45], [30.38, 77.70], [28.63, 77.24], [27.57, 77.66],
            [27.17, 78.02], [26.85, 79.00], [26.45, 80.35], [25.43, 81.85],
        ],
    },
    {
        id: "brahmaputra",
        name: "Brahmaputra",
        origin: "Angsi Glacier, Tibet",
        length: 2900,
        studyArea: {
            description: "Study reach in the central Assam valley near Guwahati, characterized by braided channels, riverine islands (chars), and extensive annual flooding.",
            bounds: { north: 26.40, south: 25.90, east: 92.00, west: 91.40 },
            center: [26.15, 91.70],
        },
        coordinates: [
            [28.75, 95.50], [27.48, 94.90], [26.76, 93.86], [26.19, 91.75],
            [26.10, 89.96], [25.18, 89.66], [24.07, 89.85], [23.55, 90.40],
        ],
    },
    {
        id: "godavari",
        name: "Godavari",
        origin: "Trimbakeshwar, Maharashtra",
        length: 1465,
        studyArea: {
            description: "Lower Godavari deltaic reach near Rajahmundry, tracking distributary shifts, mangrove margins, and riverbank agricultural encroachment.",
            bounds: { north: 17.10, south: 16.60, east: 81.90, west: 81.30 },
            center: [16.85, 81.60],
        },
        coordinates: [
            [19.94, 73.53], [19.88, 74.80], [19.15, 76.35], [18.67, 77.90],
            [18.45, 79.15], [17.72, 80.60], [16.95, 81.31], [16.73, 81.75],
        ],
    },
    {
        id: "krishna",
        name: "Krishna",
        origin: "Mahabaleshwar, Maharashtra",
        length: 1400,
        studyArea: {
            description: "Mid-Krishna segment through Andhra Pradesh near Vijayawada, focusing on reservoir-influenced bank stability and downstream sediment starvation.",
            bounds: { north: 16.70, south: 16.10, east: 80.80, west: 80.00 },
            center: [16.40, 80.40],
        },
        coordinates: [
            [17.92, 73.66], [17.38, 74.20], [16.70, 75.40], [16.51, 76.95],
            [16.18, 78.05], [15.91, 79.31], [16.08, 80.17], [15.90, 80.60],
        ],
    },
    {
        id: "narmada",
        name: "Narmada",
        origin: "Amarkantak, Madhya Pradesh",
        length: 1312,
        studyArea: {
            description: "Narmada gorge-to-estuary transition near Bharuch, Gujarat, examining tidal influence on bank morphology and riparian vegetation changes.",
            bounds: { north: 21.90, south: 21.40, east: 73.30, west: 72.60 },
            center: [21.65, 72.95],
        },
        coordinates: [
            [22.67, 81.75], [22.95, 80.40], [22.59, 79.00], [22.52, 77.77],
            [22.25, 76.05], [22.16, 74.45], [21.64, 73.00], [21.63, 72.68],
        ],
    },
    {
        id: "kaveri",
        name: "Kaveri (Cauvery)",
        origin: "Talakaveri, Karnataka",
        length: 805,
        studyArea: {
            description: "Kaveri reach between Mysuru and Srirangapatna, monitoring island erosion, channel avulsion, and seasonal flow variations downstream of KRS reservoir.",
            bounds: { north: 12.60, south: 12.20, east: 76.80, west: 76.30 },
            center: [12.40, 76.55],
        },
        coordinates: [
            [12.32, 75.49], [12.42, 76.10], [12.30, 76.65], [11.80, 76.95],
            [11.50, 77.60], [11.23, 78.17], [10.86, 78.70], [10.93, 79.85],
        ],
    },
    {
        id: "mahanadi",
        name: "Mahanadi",
        origin: "Sihawa, Chhattisgarh",
        length: 858,
        studyArea: {
            description: "Mahanadi delta near Cuttack, Odisha, analyzing distributary bank migration, flood-driven land loss, and riverine wetland dynamics.",
            bounds: { north: 20.60, south: 20.10, east: 86.20, west: 85.60 },
            center: [20.35, 85.90],
        },
        coordinates: [
            [20.35, 82.12], [20.83, 82.15], [21.17, 83.20], [21.47, 83.98],
            [20.75, 84.40], [20.30, 86.00], [20.28, 86.70],
        ],
    },
    {
        id: "sutlej",
        name: "Sutlej",
        origin: "Lake Rakshastal, Tibet",
        length: 1450,
        studyArea: {
            description: "Sutlej alluvial plain in Punjab near Ludhiana, tracking meander migration, oxbow lake formation, and encroachment on flood-prone riverbanks.",
            bounds: { north: 31.10, south: 30.60, east: 76.20, west: 75.50 },
            center: [30.85, 75.85],
        },
        coordinates: [
            [31.70, 78.83], [31.42, 77.12], [31.08, 76.53], [30.95, 76.10],
            [30.80, 75.40], [30.45, 74.50], [29.80, 73.30],
        ],
    },
    {
        id: "chambal",
        name: "Chambal",
        origin: "Janapav, Madhya Pradesh",
        length: 960,
        studyArea: {
            description: "Chambal ravine reach along the Rajasthan–Madhya Pradesh border, one of India's least disturbed stretches. Study focuses on natural bank erosion and ravine-river interaction.",
            bounds: { north: 26.10, south: 25.60, east: 77.90, west: 77.30 },
            center: [25.85, 77.60],
        },
        coordinates: [
            [22.30, 75.68], [23.10, 75.80], [24.40, 76.30], [25.20, 76.95],
            [25.90, 77.70], [26.50, 78.50], [26.85, 79.00],
        ],
    },
];

export default INDIAN_RIVERS;
