(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_b324e0._.js", {

"[project]/app/components/subscription/StripePricingTable.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "StripePricingTable": (()=>StripePricingTable)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
const StripePricingTable = ({ email })=>{
    _s();
    console.log("PUBLISHABLE KEY", ("TURBOPACK compile-time value", "pk_test_51QNZWkJu4zIq0I6FWqG4NpRVZx1F7wZ0EU9sD0xNBUMYkP38mBenXWd9Sa7UoT2v4dwzDAqjMmvrAL2DJV11zRCZ00F2sxUXxA"));
    const { data, status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    console.log("SESSION FROM PRICING TABLE", data);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StripePricingTable.useEffect": ()=>{
            const script = document.createElement("script");
            script.src = "https://js.stripe.com/v3/pricing-table.js";
            script.async = true;
            document.body.appendChild(script);
            return ({
                "StripePricingTable.useEffect": ()=>{
                    document.body.removeChild(script);
                }
            })["StripePricingTable.useEffect"];
        }
    }["StripePricingTable.useEffect"], []);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("stripe-pricing-table", {
        "client-reference-id": data?.user.email,
        "customer-email": data?.user.email,
        "pricing-table-id": "prctbl_1QQV47Ju4zIq0I6FAJBwwcZB",
        "publishable-key": "pk_test_51QNZWkJu4zIq0I6FWqG4NpRVZx1F7wZ0EU9sD0xNBUMYkP38mBenXWd9Sa7UoT2v4dwzDAqjMmvrAL2DJV11zRCZ00F2sxUXxA"
    });
};
_s(StripePricingTable, "FiiDNpjl8LJjGQ279Zs8dvcFYKQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"]
    ];
});
_c = StripePricingTable;
var _c;
__turbopack_refresh__.register(_c, "StripePricingTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/pricing-table/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>PricingTable)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$subscription$2f$StripePricingTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/components/subscription/StripePricingTable.tsx [app-client] (ecmascript)");
"use client";
;
;
function PricingTable() {
    return(// <div className=" min-h-screen items-center justify-center bg-gray-800">
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-screen h-screen content-center m-auto p-8 space-y-6 rounded-lg shadow-md",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$subscription$2f$StripePricingTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StripePricingTable"], {}, void 0, false, {
            fileName: "[project]/app/pricing-table/page.tsx",
            lineNumber: 16,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/pricing-table/page.tsx",
        lineNumber: 15,
        columnNumber: 7
    }, this));
}
_c = PricingTable;
var _c;
__turbopack_refresh__.register(_c, "PricingTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
 // export 
}}),
"[project]/app/pricing-table/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: require } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=app_b324e0._.js.map