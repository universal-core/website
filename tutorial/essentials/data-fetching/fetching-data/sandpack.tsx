import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";
import { TutorialCreateFileButton } from "@site/src/refine-theme/tutorial-create-file-button";

import { dependencies } from "../../intro/sandpack";
import { finalFiles as initialFiles } from "../intro/sandpack";
import { removeActiveFromFiles } from "@site/src/utils/remove-active-from-files";

import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { json } from "@codemirror/lang-json";
import { yaml } from "@codemirror/lang-yaml";
import { LanguageSupport, StreamLanguage } from "@codemirror/language";
import { lua } from "@codemirror/legacy-modes/mode/lua";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
  const init_files = {
    ...initialFiles,
    "/program.cpp": {
      code: `#include <iostream>
      using namespace std;

      int main() {
        cout << "Hello, World!\\n";
        return 0;
      }`,
    },
    "/main.py": {
      code: `def greet(name):
    print(f"Hello, {name}!")`,
    },
    "/script.lua": {
      code: `-- Lua script
      local function greet(name)
        print("Hello, " .. name .. "!")
      end
      greet("World")
      `,
      // optional: active or readOnly, etc.
    },
  }
  return (
    <TutorialSandpack
      dependencies={dependencies}
      files={init_files}
      finalFiles={finalFiles}
      hidePreview={true}
      options={{
        readOnly: true,
        codeEditor: {
          additionalLanguages: [
            {
              name: "python",
              extensions: ["py"],
              language: python(),
            },
            {
              name: "yaml",
              extensions: ["yaml", "yml"],
              language: yaml(),
            },
            {
              name: "json",
              extensions: ["json"],
              language: json(),
            },
            {
              name: "lua",
              extensions: ["lua", "forge"],
              language: new LanguageSupport(StreamLanguage.define(lua)),
            },
            {
              name: "cpp",
              // “cLike” in CodeMirror covers C, C++, Objective-C, C#, etc.
              extensions: ["cpp", "c", "cc", "hpp", "h", "cxx"],
              language: cpp(),
            },
          ],
        }
      }}
    >
      {children}
    </TutorialSandpack>
  );
};

// updates

const DataProviderWithGetOneMethodTsCode = /* ts */ `
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(\`\${API_URL}/\${resource}/\${id}\`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  getApiUrl: () => API_URL,
  update: () => { throw new Error("Not implemented"); },
  getList: () => { throw new Error("Not implemented"); },
  create: () => { throw new Error("Not implemented"); },
  deleteOne: () => { throw new Error("Not implemented"); },
  /* ... */
};
`.trim();

const BaseShowProductTsxCode = /* tsx */ `
export const ShowProduct = () => {
    return <h1>Hello world!</h1>;
};
`.trim();

const ShowProductWithUseOneTsxCode = /* tsx */ `
import { useOne } from "@refinedev/core";

export const ShowProduct = () => {
    const { data, isLoading } = useOne({ resource: "products", id: 123 });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <div>Product name: {data?.data.name}</div>;
};
`.trim();

const AppTsxWithShowProductCode = /* tsx */ `
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
import { ShowProduct } from "./pages/products/show";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
        <ShowProduct />
    </Refine>
  );
}
`.trim();

// actions

export const AddGetOneMethod = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "/src/providers/data-provider.ts",
          DataProviderWithGetOneMethodTsCode,
        );
        sandpack.setActiveFile("/src/providers/data-provider.ts");
      }}
    />
  );
};

export const CreateShowProductFile = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialCreateFileButton
      onClick={() => {
        sandpack.addFile({
          "/src/pages/products/show.tsx": {
            code: BaseShowProductTsxCode,
          },
        });
        sandpack.openFile("/src/pages/products/show.tsx");
        sandpack.setActiveFile("/src/pages/products/show.tsx");
      }}
      name="src/pages/products/show.tsx"
    />
  );
};

export const AddUseOneToShowProduct = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "/src/pages/products/show.tsx",
          ShowProductWithUseOneTsxCode,
        );
        sandpack.setActiveFile("/src/pages/products/show.tsx");
      }}
    />
  );
};

export const AddShowProductToAppTsx = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("/src/App.tsx", AppTsxWithShowProductCode);
        sandpack.setActiveFile("/src/App.tsx");
      }}
    />
  );
};

// files

export const finalFiles = {
  ...removeActiveFromFiles(initialFiles),
  "src/App.tsx": {
    code: AppTsxWithShowProductCode,
  },
  "src/providers/data-provider.ts": {
    code: DataProviderWithGetOneMethodTsCode,
  },
  "src/pages/products/show.tsx": {
    code: ShowProductWithUseOneTsxCode,
    active: true,
  },
};
