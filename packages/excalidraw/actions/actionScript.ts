import { register } from "./register";
import { getSelectedElements } from "../scene";
import { getNonDeletedElements } from "../element";
import type {
  ExcalidrawElement,
  NonDeletedSceneElementsMap,
} from "../element/types";
import type { AppClassProperties, AppState } from "../types";
import { arrayToMap } from "../utils";
import { updateFrameMembershipOfSelectedElements } from "../frame";
import { scriptIcon } from "../components/icons";
import { StoreAction } from "../store";

export const actionScript = register({
  name: "script",
  label: "labels.script",
  icon: scriptIcon,
  trackEvent: { category: "element" },
  perform: (elements, appState, _, app) => {
    return {
      elements: updateFrameMembershipOfSelectedElements(
        openScriptOfSelectedElement(
          elements,
          app.scene.getNonDeletedElementsMap(),
          appState,
          app,
        ),
        appState,
        app,
      ),
      appState,
      storeAction: StoreAction.CAPTURE,
    };
  },
  keyTest: (event) => false
});


const openScriptOfSelectedElement = (
  elements: readonly ExcalidrawElement[],
  elementsMap: NonDeletedSceneElementsMap,
  appState: Readonly<AppState>,
  app: AppClassProperties,
) => {
  const selectedElements = getSelectedElements(
    getNonDeletedElements(elements),
    appState,
    {
      includeBoundTextElement: true,
      includeElementsInFrames: true,
    },
  );

  const updatedElements = selectedElements;

  const updatedElementsMap = arrayToMap(updatedElements);

  console.log("Edit Script selected!")

  return elements.map(
    (element) => updatedElementsMap.get(element.id) || element,
  );
};

