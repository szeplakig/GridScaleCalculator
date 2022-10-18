const range_min = 0.5;
const range_max = 3.0;
const factor = 6;
const step = Math.pow(10, -factor);
const width = document.getElementById("width");
const height = document.getElementById("height");
const grid = document.getElementById("grid");
const output = document.getElementById("output");

function float_eq(a, b, s) {
    return Math.abs(a - b) <= s;
}

function calc() {
    const wv = parseFloat(width.value);
    const hv = parseFloat(height.value);
    const gv = parseInt(grid.value);
    let best = undefined;
    for (let z = range_min; z <= range_max; z += step) {
        const wz = (wv * z) % gv;
        const hz = (hv * z) % gv;
        if (best === undefined) best = [z, wz, hz];

        const eq_wz = float_eq(wz, best[1], step);
        const eq_hz = float_eq(hz, best[2], step);
        if (
            (
                wz < best[1] && hz < best[2] && !eq_wz && !eq_hz
            ) ||
            (
                eq_wz && eq_hz && Math.abs(1 - best[0]) > Math.abs(1 - z)
            )
        ) {
            best = [z, wz, hz];
            console.log(best);
        }
    }
    output.innerHTML =
        "Scale factor: " +
        best[0].toFixed(factor) +
        "<br/>Scaled width: " +
        (wv * best[0]).toFixed(factor) +
        ", Scaled height: " +
        (hv * best[0]).toFixed(factor);
}
