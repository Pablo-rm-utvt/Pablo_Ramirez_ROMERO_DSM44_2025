export interface Welcome {
    total: number;
    totalPages: number;
    links: Links;
    data: Datum[];
}

export interface NewSensorList {
    id: string;
    estado: string;
    temperatura_c: number;
}

export interface Datum {
    _id: string;
    fecha: Date;
    distacia_cm: number;
    distacia_inch: number;
    temperatura_fg: number;
    temperatura_c: number;
    estado: Estado;
    __v: number;
}


export interface Links {
    prev: null;
    next: string;
}

export interface SensorDataResponse {
    numberRegisters: number;
    today: Today;
    yesterday: Yesterday;
    beforeYesterday: BeforeYesterday;
}

export interface BeforeYesterday {
    maxBeforeYesterday: number;
    minBeforeYesterday: number;
    lastBeforeYesterday: LastDay[];
}

export interface LastDay {
    _id: string;
    fecha: Date;
    distacia_cm: number;
    distacia_inch: number;
    temperatura_fg: number;
    temperatura_c: number;
    estado: Estado;
    __v: number;
}

export enum Estado {
    Activo = "Activo",
    Inactivo = "Inactivo",
}

export interface Today {
    maxToday: number;
    minToday: number;
    lastToday: LastDay[];
}

export interface Yesterday {
    maxYesterday: number;
    minYesterday: number;
    lastYesterday: LastDay[];
}

type DataSensor = any;

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toDataSensor(json: string): DataSensor {
        return cast(JSON.parse(json), r("DataSensor"));
    }

    public static dataSensorToJson(value: DataSensor): string {
        return JSON.stringify(uncast(value, r("DataSensor")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) { }
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "DataSensor": o([
        { json: "numberRegisters", js: "numberRegisters", typ: 0 },
        { json: "today", js: "today", typ: r("Today") },
        { json: "yesterday", js: "yesterday", typ: r("Yesterday") },
        { json: "beforeYesterday", js: "beforeYesterday", typ: r("BeforeYesterday") },
    ], false),
    "BeforeYesterday": o([
        { json: "maxBeforeYesterday", js: "maxBeforeYesterday", typ: 3.14 },
        { json: "minBeforeYesterday", js: "minBeforeYesterday", typ: 3.14 },
        { json: "lastBeforeYesterday", js: "lastBeforeYesterday", typ: a(r("LastDay")) },
    ], false),
    "LastDay": o([
        { json: "_id", js: "_id", typ: "" },
        { json: "fecha", js: "fecha", typ: Date },
        { json: "distacia_cm", js: "distacia_cm", typ: 3.14 },
        { json: "distacia_inch", js: "distacia_inch", typ: 3.14 },
        { json: "temperatura_fg", js: "temperatura_fg", typ: 3.14 },
        { json: "temperatura_c", js: "temperatura_c", typ: 3.14 },
        { json: "estado", js: "estado", typ: r("Estado") },
        { json: "__v", js: "__v", typ: 0 },
    ], false),
    "Today": o([
        { json: "maxToday", js: "maxToday", typ: 3.14 },
        { json: "minToday", js: "minToday", typ: 3.14 },
        { json: "lastToday", js: "lastToday", typ: a(r("LastDay")) },
    ], false),
    "Yesterday": o([
        { json: "maxYesterday", js: "maxYesterday", typ: 3.14 },
        { json: "minYesterday", js: "minYesterday", typ: 3.14 },
        { json: "lastYesterday", js: "lastYesterday", typ: a(r("LastDay")) },
    ], false),
    "Estado": [
        "Activo",
        "Inactivo",
    ],
};