var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React;
var init_react = __esm({
  "node_modules/@remix-run/dev/compiler/shims/react.ts"() {
    React = __toESM(require("react"));
  }
});

// node_modules/remix/index.js
var require_remix = __commonJS({
  "node_modules/remix/index.js"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    var node = require("@remix-run/node");
    Object.defineProperty(exports, "createCookie", {
      enumerable: true,
      get: function() {
        return node.createCookie;
      }
    });
    Object.defineProperty(exports, "createCookieSessionStorage", {
      enumerable: true,
      get: function() {
        return node.createCookieSessionStorage;
      }
    });
    Object.defineProperty(exports, "createFileSessionStorage", {
      enumerable: true,
      get: function() {
        return node.createFileSessionStorage;
      }
    });
    Object.defineProperty(exports, "createMemorySessionStorage", {
      enumerable: true,
      get: function() {
        return node.createMemorySessionStorage;
      }
    });
    Object.defineProperty(exports, "createSessionStorage", {
      enumerable: true,
      get: function() {
        return node.createSessionStorage;
      }
    });
    Object.defineProperty(exports, "unstable_createFileUploadHandler", {
      enumerable: true,
      get: function() {
        return node.unstable_createFileUploadHandler;
      }
    });
    Object.defineProperty(exports, "unstable_createMemoryUploadHandler", {
      enumerable: true,
      get: function() {
        return node.unstable_createMemoryUploadHandler;
      }
    });
    Object.defineProperty(exports, "unstable_parseMultipartFormData", {
      enumerable: true,
      get: function() {
        return node.unstable_parseMultipartFormData;
      }
    });
    Object.defineProperty(exports, "__esModule", { value: true });
    var serverRuntime = require("@remix-run/server-runtime");
    Object.defineProperty(exports, "createSession", {
      enumerable: true,
      get: function() {
        return serverRuntime.createSession;
      }
    });
    Object.defineProperty(exports, "isCookie", {
      enumerable: true,
      get: function() {
        return serverRuntime.isCookie;
      }
    });
    Object.defineProperty(exports, "isSession", {
      enumerable: true,
      get: function() {
        return serverRuntime.isSession;
      }
    });
    Object.defineProperty(exports, "json", {
      enumerable: true,
      get: function() {
        return serverRuntime.json;
      }
    });
    Object.defineProperty(exports, "redirect", {
      enumerable: true,
      get: function() {
        return serverRuntime.redirect;
      }
    });
    Object.defineProperty(exports, "__esModule", { value: true });
    var react = require("@remix-run/react");
    Object.defineProperty(exports, "Form", {
      enumerable: true,
      get: function() {
        return react.Form;
      }
    });
    Object.defineProperty(exports, "Link", {
      enumerable: true,
      get: function() {
        return react.Link;
      }
    });
    Object.defineProperty(exports, "Links", {
      enumerable: true,
      get: function() {
        return react.Links;
      }
    });
    Object.defineProperty(exports, "LiveReload", {
      enumerable: true,
      get: function() {
        return react.LiveReload;
      }
    });
    Object.defineProperty(exports, "Meta", {
      enumerable: true,
      get: function() {
        return react.Meta;
      }
    });
    Object.defineProperty(exports, "NavLink", {
      enumerable: true,
      get: function() {
        return react.NavLink;
      }
    });
    Object.defineProperty(exports, "Outlet", {
      enumerable: true,
      get: function() {
        return react.Outlet;
      }
    });
    Object.defineProperty(exports, "PrefetchPageLinks", {
      enumerable: true,
      get: function() {
        return react.PrefetchPageLinks;
      }
    });
    Object.defineProperty(exports, "RemixBrowser", {
      enumerable: true,
      get: function() {
        return react.RemixBrowser;
      }
    });
    Object.defineProperty(exports, "RemixServer", {
      enumerable: true,
      get: function() {
        return react.RemixServer;
      }
    });
    Object.defineProperty(exports, "Scripts", {
      enumerable: true,
      get: function() {
        return react.Scripts;
      }
    });
    Object.defineProperty(exports, "ScrollRestoration", {
      enumerable: true,
      get: function() {
        return react.ScrollRestoration;
      }
    });
    Object.defineProperty(exports, "useActionData", {
      enumerable: true,
      get: function() {
        return react.useActionData;
      }
    });
    Object.defineProperty(exports, "useBeforeUnload", {
      enumerable: true,
      get: function() {
        return react.useBeforeUnload;
      }
    });
    Object.defineProperty(exports, "useCatch", {
      enumerable: true,
      get: function() {
        return react.useCatch;
      }
    });
    Object.defineProperty(exports, "useFetcher", {
      enumerable: true,
      get: function() {
        return react.useFetcher;
      }
    });
    Object.defineProperty(exports, "useFetchers", {
      enumerable: true,
      get: function() {
        return react.useFetchers;
      }
    });
    Object.defineProperty(exports, "useFormAction", {
      enumerable: true,
      get: function() {
        return react.useFormAction;
      }
    });
    Object.defineProperty(exports, "useHref", {
      enumerable: true,
      get: function() {
        return react.useHref;
      }
    });
    Object.defineProperty(exports, "useLoaderData", {
      enumerable: true,
      get: function() {
        return react.useLoaderData;
      }
    });
    Object.defineProperty(exports, "useLocation", {
      enumerable: true,
      get: function() {
        return react.useLocation;
      }
    });
    Object.defineProperty(exports, "useMatches", {
      enumerable: true,
      get: function() {
        return react.useMatches;
      }
    });
    Object.defineProperty(exports, "useNavigate", {
      enumerable: true,
      get: function() {
        return react.useNavigate;
      }
    });
    Object.defineProperty(exports, "useNavigationType", {
      enumerable: true,
      get: function() {
        return react.useNavigationType;
      }
    });
    Object.defineProperty(exports, "useOutlet", {
      enumerable: true,
      get: function() {
        return react.useOutlet;
      }
    });
    Object.defineProperty(exports, "useOutletContext", {
      enumerable: true,
      get: function() {
        return react.useOutletContext;
      }
    });
    Object.defineProperty(exports, "useParams", {
      enumerable: true,
      get: function() {
        return react.useParams;
      }
    });
    Object.defineProperty(exports, "useResolvedPath", {
      enumerable: true,
      get: function() {
        return react.useResolvedPath;
      }
    });
    Object.defineProperty(exports, "useSearchParams", {
      enumerable: true,
      get: function() {
        return react.useSearchParams;
      }
    });
    Object.defineProperty(exports, "useSubmit", {
      enumerable: true,
      get: function() {
        return react.useSubmit;
      }
    });
    Object.defineProperty(exports, "useTransition", {
      enumerable: true,
      get: function() {
        return react.useTransition;
      }
    });
  }
});

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});
init_react();

// server-entry-module:@remix-run/dev/server-build
init_react();

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
init_react();
var import_react = __toESM(require("react"));
var import_server = require("react-dom/server");
var import_remix = __toESM(require_remix());
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const markup = (0, import_server.renderToString)(/* @__PURE__ */ import_react.default.createElement(import_remix.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:/home/ausher/code/gh/AndrewUsher/andrewusher.dev/app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta
});
init_react();
var import_react5 = __toESM(require("react"));
var import_react6 = require("@remix-run/react");

// app/components/root/Footer.tsx
init_react();
var React3 = __toESM(require("react"));
var import_react2 = require("@remix-run/react");
function Footer() {
  return /* @__PURE__ */ React3.createElement("footer", {
    className: "text-gray-500 bg-gray-50 dark:text-slate-300 dark:bg-neutral-700"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "max-w-3xl mx-auto"
  }, /* @__PURE__ */ React3.createElement("nav", {
    className: "grid grid-cols-2 gap-4 text-center sm:grid-cols-3 lg:grid-cols-6"
  }, /* @__PURE__ */ React3.createElement(import_react2.Link, {
    to: "/about",
    className: "hover:opacity-75"
  }, "About Me"), /* @__PURE__ */ React3.createElement(import_react2.Link, {
    to: "/blog",
    className: "hover:opacity-75"
  }, "Blog"), /* @__PURE__ */ React3.createElement(import_react2.Link, {
    to: "/contact",
    className: "hover:opacity-75"
  }, "Get in Touch"), /* @__PURE__ */ React3.createElement(import_react2.Link, {
    to: "/contact",
    className: "hover:opacity-75"
  }, "Office Hours"), /* @__PURE__ */ React3.createElement(import_react2.Link, {
    to: "/projects",
    className: "hover:opacity-75"
  }, "Projects"), /* @__PURE__ */ React3.createElement(import_react2.Link, {
    to: "/uses",
    className: "hover:opacity-75"
  }, "Uses")), /* @__PURE__ */ React3.createElement("div", {
    className: "flex justify-center mt-8 space-x-6"
  }, /* @__PURE__ */ React3.createElement("a", {
    href: "https://twitter.com/AndrewUsher17",
    target: "_blank",
    rel: "noreferrer",
    "aria-label": "Twitter",
    className: "hover:opacity-75"
  }, /* @__PURE__ */ React3.createElement("svg", {
    fill: "currentColor",
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    className: "w-6 h-6"
  }, /* @__PURE__ */ React3.createElement("path", {
    d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
  }))), /* @__PURE__ */ React3.createElement("a", {
    href: "https://github.com/AndrewUsher",
    target: "_blank",
    rel: "noreferrer",
    "aria-label": "GitHub",
    className: "hover:opacity-75"
  }, /* @__PURE__ */ React3.createElement("svg", {
    fill: "currentColor",
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    className: "w-6 h-6"
  }, /* @__PURE__ */ React3.createElement("path", {
    fillRule: "evenodd",
    d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
    clipRule: "evenodd"
  })))))));
}

// app/components/root/Header.tsx
init_react();
var import_clsx = __toESM(require("clsx"));
var import_react3 = __toESM(require("react"));
var import_react4 = require("@remix-run/react");
var NavLink = ({ children, to }) => /* @__PURE__ */ import_react3.default.createElement(import_react4.NavLink, {
  className: "block ml-8 first:ml-0 text-xl dark:text-white",
  to
}, children);
var MobileNavLink = ({ children, to }) => /* @__PURE__ */ import_react3.default.createElement(import_react4.NavLink, {
  className: "block mb-4 pb-4 text-xl dark:text-white w-full text-center",
  to
}, children);
function Header() {
  const [sidebarOpen, setSidebarOpen] = (0, import_react3.useState)(false);
  const location = (0, import_react4.useLocation)();
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  const openSidebar = () => {
    setSidebarOpen(true);
  };
  (0, import_react3.useEffect)(() => {
    closeSidebar();
  }, [location]);
  return /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, /* @__PURE__ */ import_react3.default.createElement("header", {
    className: "max-w-screen-xl mx-auto py-4 px-4 flex items-center justify-between"
  }, /* @__PURE__ */ import_react3.default.createElement("h1", {
    className: "text-4xl font-bold dark:text-white"
  }, /* @__PURE__ */ import_react3.default.createElement(import_react4.Link, {
    to: "/"
  }, "Andrew Usher")), /* @__PURE__ */ import_react3.default.createElement("nav", {
    className: "hidden lg:flex justify-between"
  }, /* @__PURE__ */ import_react3.default.createElement(NavLink, {
    to: "/about"
  }, "About Me"), /* @__PURE__ */ import_react3.default.createElement(NavLink, {
    to: "/blog"
  }, "Blog")), /* @__PURE__ */ import_react3.default.createElement("nav", {
    className: "flex lg:hidden"
  }, /* @__PURE__ */ import_react3.default.createElement("button", {
    onClick: openSidebar,
    className: "dark:text-white"
  }, /* @__PURE__ */ import_react3.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-6 w-6",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /* @__PURE__ */ import_react3.default.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M4 6h16M4 12h16M4 18h16"
  }))))), /* @__PURE__ */ import_react3.default.createElement("div", {
    className: (0, import_clsx.default)("transition ease-in-out fixed top-0 bg-sky-300 h-full w-full text-white", {
      "translate-x-full": !sidebarOpen,
      "translate-x-0": sidebarOpen
    })
  }, /* @__PURE__ */ import_react3.default.createElement("nav", {
    className: "flex justify-between p-4 mb-8"
  }, /* @__PURE__ */ import_react3.default.createElement("h1", {
    className: "text-4xl font-bold dark:text-white"
  }, /* @__PURE__ */ import_react3.default.createElement(import_react4.Link, {
    to: "/"
  }, "Andrew Usher")), /* @__PURE__ */ import_react3.default.createElement("button", {
    onClick: closeSidebar,
    className: "dark:text-white"
  }, /* @__PURE__ */ import_react3.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-6 w-6",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /* @__PURE__ */ import_react3.default.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  })))), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement(MobileNavLink, {
    to: "/"
  }, "Home"), /* @__PURE__ */ import_react3.default.createElement(MobileNavLink, {
    to: "/about"
  }, "About Me"), /* @__PURE__ */ import_react3.default.createElement(MobileNavLink, {
    to: "/blog"
  }, "Blog"), /* @__PURE__ */ import_react3.default.createElement(MobileNavLink, {
    to: "/contact"
  }, "Get in Touch"), /* @__PURE__ */ import_react3.default.createElement(MobileNavLink, {
    to: "/office-hours"
  }, "Office Hours"), /* @__PURE__ */ import_react3.default.createElement(MobileNavLink, {
    to: "/projects"
  }, "Projects"), /* @__PURE__ */ import_react3.default.createElement(MobileNavLink, {
    to: "/uses"
  }, "Uses"))));
}

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-U5JBVQCY.css";

// route:/home/ausher/code/gh/AndrewUsher/andrewusher.dev/app/root.tsx
var meta = () => {
  return { title: "Andrew Usher" };
};
var links = () => {
  return [{ rel: "stylesheet", href: tailwind_default }];
};
function App() {
  return /* @__PURE__ */ import_react5.default.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ import_react5.default.createElement("head", null, /* @__PURE__ */ import_react5.default.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ import_react5.default.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1"
  }), /* @__PURE__ */ import_react5.default.createElement("meta", {
    name: "theme-color",
    media: "(prefers-color-scheme: light)",
    content: "#7dd3fc"
  }), /* @__PURE__ */ import_react5.default.createElement("meta", {
    name: "theme-color",
    media: "(prefers-color-scheme: dark)",
    content: "#0284c7"
  }), /* @__PURE__ */ import_react5.default.createElement("link", {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/apple-touch-icon.png"
  }), /* @__PURE__ */ import_react5.default.createElement("link", {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png"
  }), /* @__PURE__ */ import_react5.default.createElement("link", {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png"
  }), /* @__PURE__ */ import_react5.default.createElement("link", {
    rel: "manifest",
    href: "/site.webmanifest"
  }), /* @__PURE__ */ import_react5.default.createElement(import_react6.Meta, null), /* @__PURE__ */ import_react5.default.createElement(import_react6.Links, null)), /* @__PURE__ */ import_react5.default.createElement("body", {
    className: "dark:bg-neutral-900"
  }, /* @__PURE__ */ import_react5.default.createElement(Header, null), /* @__PURE__ */ import_react5.default.createElement(import_react6.Outlet, null), /* @__PURE__ */ import_react5.default.createElement(Footer, null), /* @__PURE__ */ import_react5.default.createElement(import_react6.ScrollRestoration, null), /* @__PURE__ */ import_react5.default.createElement(import_react6.Scripts, null), false, /* @__PURE__ */ import_react5.default.createElement("script", {
    src: "https://cdn.jsdelivr.net/gh/virae/we-stand-with-ukraine@v1.0.1/badge.js",
    defer: true
  })));
}

// route:/home/ausher/code/gh/AndrewUsher/andrewusher.dev/app/routes/blog.$slug.tsx
var blog_slug_exports = {};
__export(blog_slug_exports, {
  default: () => BlogPostPage,
  loader: () => loader,
  meta: () => meta2
});
init_react();
var import_dayjs = __toESM(require("dayjs"));
var import_react8 = __toESM(require("react"));
var import_node = require("@remix-run/node");
var import_react9 = require("@remix-run/react");
var import_snarkdown = __toESM(require("snarkdown"));

// app/components/post/ReadingProgress/ReadingProgress.tsx
init_react();
var import_react7 = __toESM(require("react"));
function useReadingProgress() {
  const [completion, setCompletion] = (0, import_react7.useState)(0);
  (0, import_react7.useEffect)(() => {
    const updateScrollCompletion = () => {
      const currentScrollingProgress = window.scrollY;
      const totalScrollHeight = document.body.scrollHeight - window.innerHeight;
      if (totalScrollHeight) {
        setCompletion(Number((currentScrollingProgress / totalScrollHeight).toFixed(2)) * 100);
      }
    };
    window.addEventListener("scroll", updateScrollCompletion);
    return () => {
      window.removeEventListener("scroll", updateScrollCompletion);
    };
  }, []);
  return completion;
}
function ReadingProgressBar() {
  const completion = useReadingProgress();
  return /* @__PURE__ */ import_react7.default.createElement("span", {
    id: "progress-bar",
    style: {
      transform: `translateX(${completion - 100}%)`
    },
    className: "fixed bottom-0 w-full transition-transform duration-150 h-1 bg-sky-600"
  });
}

// app/lib/contentful.server.ts
init_react();

// app/lib/globals.server.ts
init_react();
var import_contentful = require("contentful");
var contentfulClient;
var contentfulAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
var contentfulSpaceId = process.env.CONTENTFUL_SPACE_ID;
if (true) {
  contentfulClient = (0, import_contentful.createClient)({
    accessToken: contentfulAccessToken,
    space: contentfulSpaceId
  });
} else {
  if (!global.__contentfulClient) {
    global.__contentfulClient = (0, import_contentful.createClient)({
      accessToken: contentfulAccessToken,
      space: contentfulSpaceId
    });
  }
  contentfulClient = global.__contentfulClient;
}

// app/lib/contentful.server.ts
var getBlogPosts = async () => {
  const data = await contentfulClient.getEntries({
    content_type: "blog-post",
    order: "-fields.date"
  });
  return data;
};
var getBlogPostBySlug = async (slug) => {
  const searchResults = await contentfulClient.getEntries({
    content_type: "blog-post",
    "fields.slug": slug
  });
  const foundPost = searchResults.items[0];
  return foundPost.fields;
};
var getProjects = async () => {
  const data = await contentfulClient.getEntries({
    content_type: "projects",
    order: "-fields.date"
  });
  return data;
};

// route:/home/ausher/code/gh/AndrewUsher/andrewusher.dev/app/routes/blog.$slug.tsx
var loader = async ({ params }) => {
  try {
    const _a = await getBlogPostBySlug(params.slug), { content: mdContent } = _a, rest = __objRest(_a, ["content"]);
    const content = (0, import_snarkdown.default)(mdContent);
    return __spreadProps(__spreadValues({}, rest), {
      content
    });
  } catch (err) {
    console.error(err);
    throw (0, import_node.json)({ status: 404 });
  }
};
var meta2 = ({ data }) => {
  if (!(data == null ? void 0 : data.content)) {
    return {
      title: "Not Found",
      description: "You landed on a page that Peter the Penguin wasn't able to find"
    };
  } else {
    return {
      title: data.title,
      description: `${data.title} | Andrew Usher`
    };
  }
};
function BlogPostPage() {
  const post = (0, import_react9.useLoaderData)();
  const formattedPublishDate = (0, import_dayjs.default)(post.date).format("MMMM DD, YYYY");
  return /* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, /* @__PURE__ */ import_react8.default.createElement("main", {
    className: "max-w-screen-xl mx-auto py-12 px-4 prose dark:prose-invert"
  }, /* @__PURE__ */ import_react8.default.createElement("h1", {
    className: "mb-1"
  }, post.title), /* @__PURE__ */ import_react8.default.createElement("time", {
    dateTime: post.date
  }, "Published on ", formattedPublishDate), /* @__PURE__ */ import_react8.default.createElement("div", {
    className: "mt-12",
    dangerouslySetInnerHTML: { __html: post.content }
  })), /* @__PURE__ */ import_react8.default.createElement(ReadingProgressBar, null));
}

// route:/home/ausher/code/gh/AndrewUsher/andrewusher.dev/app/routes/projects.tsx
var projects_exports = {};
__export(projects_exports, {
  default: () => ProjectsRoute,
  loader: () => loader2,
  meta: () => meta3
});
init_react();
var React9 = __toESM(require("react"));
var import_react11 = require("@remix-run/react");

// app/components/shared/Projects/Projects.tsx
init_react();
var import_react10 = __toESM(require("react"));
function Projects({ projects }) {
  return /* @__PURE__ */ import_react10.default.createElement(import_react10.default.Fragment, null, projects.map((project) => /* @__PURE__ */ import_react10.default.createElement("article", {
    key: project.title,
    className: "mb-6"
  }, /* @__PURE__ */ import_react10.default.createElement("h3", {
    className: "text-2xl mb-4 font-semibold dark:text-white underline decoration-sky-400 decoration-[0.25rem] motion-safe:transition-all motion-safe:duration-200 hover:decoration-[0.5rem] focus:decoration-[0.5rem hover:decoration-sky-400/50 focus:decoration-sky-600/50"
  }, project.title), /* @__PURE__ */ import_react10.default.createElement("p", {
    className: "text-xl leading-8 dark:text-slate-300"
  }, project.summary))));
}

// route:/home/ausher/code/gh/AndrewUsher/andrewusher.dev/app/routes/projects.tsx
var loader2 = async () => {
  const data = await getProjects();
  const parsedProjects = data.items.map(({ fields }) => __spreadValues({}, fields));
  return parsedProjects;
};
var meta3 = () => ({
  title: "Projects - Andrew Usher",
  description: "Projects that I've worked on solely/contributed to."
});
function ProjectsRoute() {
  const projects = (0, import_react11.useLoaderData)();
  return /* @__PURE__ */ React9.createElement(React9.Fragment, null, /* @__PURE__ */ React9.createElement("main", {
    className: "max-w-screen-xl mx-auto py-4 px-4"
  }, /* @__PURE__ */ React9.createElement(Projects, {
    projects
  })));
}

// route:/home/ausher/code/gh/AndrewUsher/andrewusher.dev/app/routes/contact.tsx
var contact_exports = {};
__export(contact_exports, {
  action: () => action,
  default: () => ContactRoute
});
init_react();
var React12 = __toESM(require("react"));
var import_node2 = require("@remix-run/node");
var import_react12 = require("@remix-run/react");

// app/components/shared/Input/Input.tsx
init_react();
var React10 = __toESM(require("react"));
var Input = (_a) => {
  var _b = _a, { label, id } = _b, rest = __objRest(_b, ["label", "id"]);
  return /* @__PURE__ */ React10.createElement("div", {
    className: "relative h-16 mb-8"
  }, /* @__PURE__ */ React10.createElement("label", {
    htmlFor: id,
    className: "absolute text-xs font-medium text-gray-500 top-3 left-3"
  }, label), /* @__PURE__ */ React10.createElement("input", __spreadValues({
    id,
    name: id,
    className: "absolute inset-0 w-full px-3 pb-3 bg-transparent border-gray-200 rounded-lg sm:text-sm pt-9 dark:text-white",
    type: "text"
  }, rest)));
};

// app/components/shared/Textarea.tsx
init_react();
var React11 = __toESM(require("react"));
var TextArea = (_a) => {
  var _b = _a, { label, id } = _b, rest = __objRest(_b, ["label", "id"]);
  return /* @__PURE__ */ React11.createElement("div", {
    className: "relative h-32 mb-8"
  }, /* @__PURE__ */ React11.createElement("label", {
    htmlFor: id,
    className: "absolute text-xs font-medium text-gray-500 top-3 left-3"
  }, label), /* @__PURE__ */ React11.createElement("textarea", __spreadValues({
    id,
    name: id,
    className: "absolute inset-0 w-full px-3 pb-3 bg-transparent border-gray-200 rounded-lg sm:text-sm pt-9 dark:text-white"
  }, rest)));
};

// app/lib/airtable.server.ts
init_react();
var import_airtable = __toESM(require("airtable"));
var base = import_airtable.default.base("appSBBeNjLaqKqTAP");
var addContactToTable = async ({ body, email, name, subject }) => {
  base("Table 1").create([
    {
      fields: {
        Body: body,
        Email: email,
        Name: name,
        Subject: subject
      }
    }
  ], { typecast: false }, (err, record) => {
    if (err) {
      console.error(err);
      throw err;
    }
  });
};

// route:/home/ausher/code/gh/AndrewUsher/andrewusher.dev/app/routes/contact.tsx
var action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const body = formData.get("body");
    const email = formData.get("email");
    const name = formData.get("name");
    const subject = formData.get("subject");
    await addContactToTable({ body, email, name, subject });
    return (0, import_node2.json)({ success: true });
  } catch (err) {
    console.error("Error when sending to table", err);
  }
};
function ContactRoute() {
  var _a;
  const fetcher = (0, import_react12.useFetcher)();
  const submitted = fetcher.type === "done" && ((_a = fetcher.data) == null ? void 0 : _a.success) === true;
  return /* @__PURE__ */ React12.createElement("main", {
    className: "max-w-screen-md mx-auto py-4 px-4"
  }, /* @__PURE__ */ React12.createElement("section", {
    className: "prose dark:prose-invert mb-8"
  }, /* @__PURE__ */ React12.createElement("p", null, "How can I help you?"), /* @__PURE__ */ React12.createElement("p", null, "If you want us to work together on a project, or have any questions about what I do, don't hesitate to write me."), /* @__PURE__ */ React12.createElement("p", null, "Here are a few tips on writing me:"), /* @__PURE__ */ React12.createElement("ul", null, /* @__PURE__ */ React12.createElement("li", null, "Use paragraphs, avoid large walls of text."), /* @__PURE__ */ React12.createElement("li", null, "Number your asks if there are multiple"), /* @__PURE__ */ React12.createElement("li", null, "Keep it as short as you can"), /* @__PURE__ */ React12.createElement("li", null, "Post code on a git repo, Codepen or smaller stuff or errors in a Gist. Screenshots are helpful too!"))), /* @__PURE__ */ React12.createElement(fetcher.Form, {
    method: "post"
  }, /* @__PURE__ */ React12.createElement(Input, {
    label: "Name",
    id: "name",
    required: true
  }), /* @__PURE__ */ React12.createElement(Input, {
    label: "Email",
    id: "email",
    required: true
  }), /* @__PURE__ */ React12.createElement(Input, {
    label: "Subject",
    id: "subject",
    required: true
  }), /* @__PURE__ */ React12.createElement(TextArea, {
    label: "Body",
    id: "body",
    required: true
  }), submitted ? /* @__PURE__ */ React12.createElement("p", {
    className: "bg-sky-200/50 dark:bg-sky-700 border-l-8 border-l-sky-500 dark:border-l-yellow-400 dark:text-white p-4"
  }, "Email sent! I'll be in touch soon!") : /* @__PURE__ */ React12.createElement("button", {
    className: "relative inline-block group mb-12",
    type: "submit",
    disabled: fetcher.state === "submitting"
  }, /* @__PURE__ */ React12.createElement("span", {
    className: "absolute inset-0 bg-blue-300 dark:bg-blue-700 transition-transform transform translate-x-2 translate-y-2 group-hover:translate-y-0 group-hover:translate-x-0"
  }), /* @__PURE__ */ React12.createElement("span", {
    className: "relative inline-block px-5 py-3 font-bold tracking-widest uppercase border-2 border-black dark:text-white dark:border-white"
  }, "Send Message"))));
}

// route:/home/ausher/code/gh/AndrewUsher/andrewusher.dev/app/routes/about.tsx
var about_exports = {};
__export(about_exports, {
  default: () => AboutPage
});
init_react();
var React14 = __toESM(require("react"));

// mdx:/home/ausher/code/gh/AndrewUsher/andrewusher.dev/app/content/about.mdx
init_react();
var import_react13 = __toESM(require("react"));
function MDXContent(props = {}) {
  const _components = Object.assign({
    h2: "h2",
    p: "p"
  }, props.components), { wrapper: MDXLayout2 } = _components;
  const _content = /* @__PURE__ */ import_react13.default.createElement(import_react13.default.Fragment, null, /* @__PURE__ */ import_react13.default.createElement(_components.h2, null, "About Me"), "\n", /* @__PURE__ */ import_react13.default.createElement(_components.p, null, "I'm a dedicated and dependable front-end web developer and designer that specializes in landing pages and personal portfolios. My goal is to use the Internet to reach out to others and assist them in establishing an online presence. I like to build things - usually with technology, and I believe technology should enhance every person's life."), "\n", /* @__PURE__ */ import_react13.default.createElement(_components.p, null, "Throughout my life, I've had a passion for computers. As a teenager, I toyed around in programs like Adobe Illustrator and got pretty good at it. Now, I'm super passionate about web design and development, and I have one year of study behind me."), "\n", /* @__PURE__ */ import_react13.default.createElement(_components.p, null, "I also enjoy cycling around the city and exploring, and have been riding bikes for over 10 years and have completed trips ranging from 20 to 40 miles. I'm inspired by a cup of hot chocolate, good music, and interesting documentaries."));
  return MDXLayout2 ? /* @__PURE__ */ import_react13.default.createElement(MDXLayout2, __spreadValues({}, props), _content) : _content;
}
var about_default = MDXContent;
var headers = typeof attributes !== "undefined" && attributes.headers;
var meta4 = typeof attributes !== "undefined" && attributes.meta;

// route:/home/ausher/code/gh/AndrewUsher/andrewusher.dev/app/routes/about.tsx
function AboutPage() {
  return /* @__PURE__ */ React14.createElement(React14.Fragment, null, /* @__PURE__ */ React14.createElement("div", {
    className: "prose lg:prose-xl max-w-screen-xl mx-auto py-4 px-4"
  }, /* @__PURE__ */ React14.createElement(about_default, null)));
}

// route:/home/ausher/code/gh/AndrewUsher/andrewusher.dev/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  loader: () => loader3
});
init_react();
var React18 = __toESM(require("react"));
var import_react18 = require("@remix-run/react");

// app/components/home/RecentPosts/RecentPosts.tsx
init_react();
var import_dayjs3 = __toESM(require("dayjs"));
var import_customParseFormat = __toESM(require("dayjs/plugin/customParseFormat"));
var import_react16 = __toESM(require("react"));

// app/components/shared/Posts/index.tsx
init_react();
var import_dayjs2 = __toESM(require("dayjs"));
var import_react14 = __toESM(require("react"));
var import_react15 = require("@remix-run/react");
function Posts({ posts }) {
  return /* @__PURE__ */ import_react14.default.createElement(import_react14.default.Fragment, null, posts.map((post) => /* @__PURE__ */ import_react14.default.createElement("article", {
    key: post.title,
    className: "mb-6"
  }, /* @__PURE__ */ import_react14.default.createElement("h3", {
    className: "text-2xl mb-1 font-semibold dark:text-white"
  }, /* @__PURE__ */ import_react14.default.createElement(import_react15.Link, {
    className: "hover:text-sky-500",
    to: `/blog/${post.slug}`
  }, post.title)), /* @__PURE__ */ import_react14.default.createElement("time", {
    dateTime: post.date,
    className: "text-sm text-slate-700 dark:text-slate-500"
  }, "Published on ", (0, import_dayjs2.default)(post.date).format("MMMM DD, YYYY")))));
}

// app/components/home/RecentPosts/RecentPosts.tsx
import_dayjs3.default.extend(import_customParseFormat.default);
function RecentPosts({ posts }) {
  return /* @__PURE__ */ import_react16.default.createElement("section", null, /* @__PURE__ */ import_react16.default.createElement("h2", {
    className: "text-4xl font-bold mb-8 dark:text-white"
  }, "Recent Blog Posts"), /* @__PURE__ */ import_react16.default.createElement(Posts, {
    posts
  }));
}

// app/components/home/RecentProjects/RecentProjects.tsx
init_react();
var import_react17 = __toESM(require("react"));
function RecentProjects({ projects }) {
  return /* @__PURE__ */ import_react17.default.createElement("section", null, /* @__PURE__ */ import_react17.default.createElement("h2", {
    className: "text-4xl font-bold mb-8 dark:text-white"
  }, "Recent Projects"), /* @__PURE__ */ import_react17.default.createElement(Projects, {
    projects
  }));
}

// route:/home/ausher/code/gh/AndrewUsher/andrewusher.dev/app/routes/index.tsx
function Paragraph({ children }) {
  return /* @__PURE__ */ React18.createElement("p", null, children);
}
function ExternalLink({ href, children }) {
  return /* @__PURE__ */ React18.createElement("a", {
    className: "underline",
    href
  }, children);
}
function IntroLinkButton({ children, to }) {
  return /* @__PURE__ */ React18.createElement(import_react18.Link, {
    className: "bg-sky-400 dark:bg-sky-600 hover:bg-sky-600 dark:hover:bg-sky-800 hover:text-white mr-8 px-4 py-4 text-lg ease-in-out w-full md:w-auto md:inline-block block text-center mb-8 dark:text-white",
    to
  }, children);
}
var loader3 = async () => {
  const [blogPosts, projects] = await Promise.all([getBlogPosts(), getProjects()]);
  return {
    recentBlogPosts: blogPosts.items.slice(0, 5).map(({ fields }) => ({
      date: fields.date,
      slug: fields.slug,
      title: fields.title
    })),
    recentProjects: projects.items.map(({ fields }) => ({
      summary: fields.summary,
      title: fields.title
    }))
  };
};
function Index() {
  const { recentBlogPosts, recentProjects } = (0, import_react18.useLoaderData)();
  return /* @__PURE__ */ React18.createElement(React18.Fragment, null, /* @__PURE__ */ React18.createElement("div", {
    className: "max-w-screen-xl mx-auto py-4 px-4"
  }, /* @__PURE__ */ React18.createElement("div", {
    className: "prose lg:prose-xl dark:prose-invert"
  }, /* @__PURE__ */ React18.createElement(Paragraph, null, "Howdy! During the day, I am a systems engineer at", " ", /* @__PURE__ */ React18.createElement(ExternalLink, {
    href: "https://www.autozone.com/"
  }, "AutoZone"), ", primarily leading a small team of React developers on the B2C web application."), /* @__PURE__ */ React18.createElement(Paragraph, null, "During my free time, I like dabbling around with new front end technologies by creating my own projects. When I'm not coding, I like to play basketball and ride my bike throughout downtown Memphis."), /* @__PURE__ */ React18.createElement(Paragraph, null, /* @__PURE__ */ React18.createElement(import_react18.Link, {
    to: "/about"
  }, "Read more about me here."))), /* @__PURE__ */ React18.createElement("div", {
    className: "mt-12"
  }, /* @__PURE__ */ React18.createElement(IntroLinkButton, {
    to: "/blog"
  }, "Go To Blog"), /* @__PURE__ */ React18.createElement(IntroLinkButton, {
    to: "/contact"
  }, "Get In Touch")), /* @__PURE__ */ React18.createElement(RecentProjects, {
    projects: recentProjects
  }), /* @__PURE__ */ React18.createElement(RecentPosts, {
    posts: recentBlogPosts
  })));
}

// route:/home/ausher/code/gh/AndrewUsher/andrewusher.dev/app/routes/blog.tsx
var blog_exports = {};
__export(blog_exports, {
  default: () => Blog,
  loader: () => loader4
});
init_react();
var React19 = __toESM(require("react"));
var import_react19 = require("@remix-run/react");
var loader4 = async () => {
  const data = await getBlogPosts();
  const parsedPosts = data.items.map(({ fields }) => __spreadValues({}, fields));
  return parsedPosts;
};
function Blog() {
  const posts = (0, import_react19.useLoaderData)();
  return /* @__PURE__ */ React19.createElement(React19.Fragment, null, /* @__PURE__ */ React19.createElement("main", {
    className: "max-w-screen-xl mx-auto py-4 px-4"
  }, /* @__PURE__ */ React19.createElement(Posts, {
    posts
  })));
}

// mdx:/home/ausher/code/gh/AndrewUsher/andrewusher.dev/app/routes/uses.mdx
var uses_exports = {};
__export(uses_exports, {
  attributes: () => attributes2,
  default: () => uses_default,
  filename: () => filename,
  headers: () => headers2,
  links: () => links2,
  meta: () => meta5
});
init_react();
var import_react20 = __toESM(require("react"));
var attributes2 = {
  "meta": {
    "title": "Uses - Andrew Usher",
    "description": "Software/hardware that I use daily."
  },
  "headers": {
    "Cache-Control": "public, s-max-age=36000"
  }
};
var MDXLayout = function Layout({ children }) {
  return /* @__PURE__ */ import_react20.default.createElement("main", {
    className: "prose max-w-screen-xl mx-auto py-12 px-4 dark:prose-invert"
  }, children);
};
function MDXContent2(props = {}) {
  const _components = Object.assign({
    h2: "h2",
    ul: "ul",
    li: "li",
    a: "a",
    strong: "strong"
  }, props.components);
  const _content = /* @__PURE__ */ import_react20.default.createElement(import_react20.default.Fragment, null, /* @__PURE__ */ import_react20.default.createElement(_components.h2, null, "Hardware"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.ul, null, "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://www.amazon.com/Apple-i7-7700HQ-Quad-Core-Bluetooth-Refurbished/dp/B07K1KNH29"
  }, "2017 MacBook Pro 15 Inch"), " - Work laptop"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://www.bestbuy.com/site/macbook-air-13-3-laptop-apple-m1-chip-8gb-memory-256gb-ssd-latest-model-space-gray/5721600.p?skuId=5721600"
  }, "M1 Macbook Air"), " - Personal laptop"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://www.amazon.com/Apple-iPhone-Graphite-Carrier-Subscription/dp/B08L5P2CRK"
  }, "iPhone 12 Pro Max"), " - Personal phone"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, "Keyboard: ", /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://www.apple.com/shop/product/MK2A3LL/A/magic-keyboard-us-english"
  }, "Magic Keyboard")), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, "Mouse: ", /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://www.apple.com/shop/product/MK2E3AM/A/magic-mouse"
  }, "Magic Mouse")), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, "Monitors: ", /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://www.bestbuy.com/site/samsung-ur55-series-28-ips-4k-uhd-monitor-black/6386391.p?skuId=6386391"
  }, "Samsung UR55 4K Monitor"), " and ", /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://www.amazon.com/gp/product/B071L1KDVB/ref=ppx_yo_dt_b_asin_title_o08_s00?ie=UTF8&psc=1"
  }, "LG 29UM59-A")), "\n"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.h2, null, "Desktop PC"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.ul, null, "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.strong, null, "CPU"), ": AMD Ryzen 5 2600X"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.strong, null, "RAM"), ": 16GB G.SKILL Ripjaws V @ 3200MHz"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.strong, null, "GPU"), ": GIGABYTE Radeon RX 580 GAMING 8GB"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.strong, null, "Display"), ": ", /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://www.bestbuy.com/site/samsung-ur55-series-28-ips-4k-uhd-monitor-black/6386391.p?skuId=6386391"
  }, "Samsung UR55 4K Monitor"), " and ", /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://www.amazon.com/gp/product/B071L1KDVB/ref=ppx_yo_dt_b_asin_title_o08_s00?ie=UTF8&psc=1"
  }, "LG 29UM59-A")), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.strong, null, "Motherboard"), ": MSI PRO B450-A PRO MAX AM4 AMD B450 SATA 6Gb/s ATX"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.strong, null, "Power Supply"), ": EVGA 600 BR"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.strong, null, "Mouse"), ": ", /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://www.amazon.com/dp/B08D7293XC/?coliid=I1MS32RMOJARLB&colid=1CSW165RQ9BV8&psc=1&ref_=lv_ov_lig_dp_it"
  }, "Logitech G305")), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.strong, null, "Keyboard"), ": ", /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://www.amazon.com/Logitech-G613-Lightspeed-Mechanical-Multihost-Connectivity/dp/B07796MBJ7?ref_=ast_sto_dp&th=1&psc=1"
  }, "Logitech G613")), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.strong, null, "Case"), ": SilentiumPC Regnum RG4T"), "\n"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.h2, null, "Software"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.ul, null, "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://www.google.com/chrome/canary/"
  }, "Chrome Canary"), " - Browser"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "http://figma.com/"
  }, "Figma"), " - Design"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://fishshell.com/"
  }, "Fish"), " - Shell/terminal scripting language of choice"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://code.visualstudio.com/"
  }, "VSCode"), " - Code editor"), "\n"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.h2, null, "Chrome Extensions"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.ul, null, "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://chrome.google.com/webstore/detail/lustre/cjmfiochlaffhnellbhffgnjocahinnh?hl=en"
  }, "Lustre")), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://chrome.google.com/webstore/detail/modern-design-for-wikiped/emdkdnnopdnajipoapepbeeiemahbjcn"
  }, "Modern Design for Wikipedia")), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://www.octotree.io/"
  }, "Octotree")), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://chrome.google.com/webstore/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall"
  }, "OneTab")), "\n"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.h2, null, "Linux Apps"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.ul, null, "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://www.gitkraken.com/"
  }, "Gitkraken"), " - Git GUI"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://wiki.gnome.org/Apps/Lollypop"
  }, "Lollypop"), " - Music client"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://shutter-project.org/"
  }, "Shutter"), " - Screenshot tool"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://www.thunderbird.net/en-US/"
  }, "Thunderbird"), " - Email client"), "\n"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.h2, null, "Mac Apps"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.ul, null, "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://fig.io/"
  }, "Fig"), " - Autocomplete for popular terminal commands"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://hazeover.com/"
  }, "HazeOver"), " - Dins all windows except for active one"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://getkap.co/"
  }, "Kap"), " - Screen capturing tool"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://apps.apple.com/us/app/magnet/id441258766?mt=12"
  }, "Magnet"), " - Window manager"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://www.raycast.com/"
  }, "Raycast"), " - Spotlight search replacement"), "\n"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.h2, null, "Mobile Apps"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.ul, null, "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://apps.apple.com/us/app/apollo-for-reddit/id979274575"
  }, "Apollo"), " - Reddit client"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://apps.apple.com/us/app/dark-sky-weather/id517329357"
  }, "Dark Sky"), " - My favorite weather app, even though ", /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://www.theverge.com/2021/6/10/22527878/dark-sky-apple-ios-app-website-api-shut-down-end-of-2022"
  }, "it's shutting down at the end of 2022 :(")), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://apps.apple.com/us/app/feedly-smart-news-reader/id396069556"
  }, "Feedly"), " - My RSS reader of choice"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://apps.apple.com/us/app/notion-notes-docs-tasks/id1232780281"
  }, "Notion"), " - My personal swiss army knife for note taking/task management/scheduling"), "\n", /* @__PURE__ */ import_react20.default.createElement(_components.li, null, /* @__PURE__ */ import_react20.default.createElement(_components.a, {
    href: "https://apps.apple.com/us/app/shazam-music-discovery/id284993459"
  }, "Shazam"), " - Makes it easy to find songs when I'm out and about"), "\n"));
  return MDXLayout ? /* @__PURE__ */ import_react20.default.createElement(MDXLayout, __spreadValues({}, props), _content) : _content;
}
var uses_default = MDXContent2;
var filename = "uses.mdx";
var headers2 = typeof attributes2 !== "undefined" && attributes2.headers;
var meta5 = typeof attributes2 !== "undefined" && attributes2.meta;
var links2 = void 0;

// server-assets-manifest:@remix-run/dev/assets-manifest
init_react();
var assets_manifest_default = { "version": "a3ff0237", "entry": { "module": "/build/entry.client-4H7YIZGT.js", "imports": ["/build/_shared/chunk-UQUF5UR5.js", "/build/_shared/chunk-IIGBFZUG.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-ASSNQPDS.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/about-5EM2W5EQ.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/blog": { "id": "routes/blog", "parentId": "root", "path": "blog", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/blog-76PZ33F4.js", "imports": ["/build/_shared/chunk-AEPKTLNW.js", "/build/_shared/chunk-SQCULNRE.js", "/build/_shared/chunk-BNUF6U6M.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/blog.$slug": { "id": "routes/blog.$slug", "parentId": "root", "path": "blog/:slug", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/blog.$slug-WFNZBPPD.js", "imports": ["/build/_shared/chunk-SQCULNRE.js", "/build/_shared/chunk-BNUF6U6M.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/contact": { "id": "routes/contact", "parentId": "root", "path": "contact", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/contact-AOJTXTSV.js", "imports": void 0, "hasAction": true, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-72Z3NB3D.js", "imports": ["/build/_shared/chunk-4JW6IUZZ.js", "/build/_shared/chunk-AEPKTLNW.js", "/build/_shared/chunk-SQCULNRE.js", "/build/_shared/chunk-BNUF6U6M.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/projects": { "id": "routes/projects", "parentId": "root", "path": "projects", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/projects-NUFCQON2.js", "imports": ["/build/_shared/chunk-4JW6IUZZ.js", "/build/_shared/chunk-BNUF6U6M.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/uses": { "id": "routes/uses", "parentId": "root", "path": "uses", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/uses-SRGHTUJU.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-A3FF0237.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/blog.$slug": {
    id: "routes/blog.$slug",
    parentId: "root",
    path: "blog/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: blog_slug_exports
  },
  "routes/projects": {
    id: "routes/projects",
    parentId: "root",
    path: "projects",
    index: void 0,
    caseSensitive: void 0,
    module: projects_exports
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "root",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: contact_exports
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/blog": {
    id: "routes/blog",
    parentId: "root",
    path: "blog",
    index: void 0,
    caseSensitive: void 0,
    module: blog_exports
  },
  "routes/uses": {
    id: "routes/uses",
    parentId: "root",
    path: "uses",
    index: void 0,
    caseSensitive: void 0,
    module: uses_exports
  }
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
/**
 * @remix-run/node v1.3.5
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * @remix-run/react v1.3.5
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * @remix-run/server-runtime v1.3.5
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
