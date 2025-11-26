# DEBUGGING DOCUMENTATION

## 1. JavaScript Debugging

### a. Using `console`

The simplest and most common debugging method.

``` js
console.log(variable);        // Logs variable value
console.error("Error msg");   // Logs errors
console.warn("Warning msg");  // Logs warnings
console.table(arrayOrObj);    // Formats arrays/objects
console.time("label");        // Start timer
console.timeEnd("label");     // End timer
```

**Tips** - Add logs where you want to inspect data. - Use
`console.table()` for arrays of objects. - Remove logs in production.



### b. Using `debugger`

``` js
function testDebug(value) {
  debugger;   // Pauses execution
  console.log(value);
}
```

Used with browser DevTools to inspect: - Variables\
- Call stack\
- Scope



### c. Browser Developer Tools

Access: **Right-click → Inspect**

**Key Features** - **Console:** run JS, view logs\
- **Sources:** breakpoints, step-by-step execution\
- **Network:** inspect API requests/responses\
- **Elements:** inspect DOM\
- **Call Stack:** see order of function execution\
- **Watch/Scope:** track variables

**Breakpoint Types** - Line-of-code\
- Conditional\
- XHR/fetch\
- Event listener



### d. Error Handling

``` js
try {
  riskyFunction();
} catch (err) {
  console.error("Something went wrong:", err);
}
```



### e. Debugging Async Code

``` js
async function fetchData() {
  try {
    const res = await fetch("https://api.example.com/data");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

Use: - `async/await`\
- `.then()`\
- DevTools Promise inspector



## 2. HTML Debugging

### a. Inspect Element

Right-click → **Inspect Element**\
Check DOM structure, classes, attributes.



### b. Validate HTML

Use **W3C HTML Validator** to catch structural errors.



### c. Dynamic DOM Testing

``` js
document.querySelector("#myElement").innerText = "Debug test";
```


## 3. CSS Debugging

### a. Inspect Styles

DevTools → **Elements → Styles**

-   Check which rules are applied\
-   Identify overridden selectors\
-   Toggle properties on/off



### b. Box Model

DevTools → **Computed → Box Model**

Inspect: - Padding\
- Border\
- Margin\
- Actual content size



### c. Highlight Layout Issues

``` css
outline: 1px solid red;
```

Use background colors to identify hidden elements.



### d. Common CSS Pitfalls

-   Specificity conflicts\
-   Missing units (e.g., `width: 100` instead of `100px`)\
-   Flex/Grid misalignment\
-   Wrong selector targeting


## 4. Network / API Debugging

Use DevTools **Network** tab to inspect:

-   Status codes (200, 404, 500...)\
-   Request headers\
-   Response body\
-   Payload\
-   Timing

Debug in JS:

``` js
console.log(response);
```
