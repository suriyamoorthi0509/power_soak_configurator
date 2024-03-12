import { action, thunk } from "easy-peasy";

import { calculateFlashLength } from "../Constants/global.js";
const psconfigmodel = {
  psconfig: {},

  setDrainValue: action((state, payload) => {
    state.psconfig.drainValue = payload;
  }),

  calculateDrainStore: action((state, payload) => {
    let cleanDrainboardlength = "";
    if (
      payload.leftEndSplash != null &&
      payload.leftEndSplash != "" &&
      payload.rightEndSplash != null &&
      payload.rightEndSplash != ""
    ) {
      let leftsplashLength = calculateFlashLength(payload.leftEndSplash);
      let rightsplashLength = calculateFlashLength(payload.rightEndSplash);
      if (
        payload.unitLength != null &&
        payload.soildDrainBoard != null &&
        payload.scrapLength != null &&
        payload.disposerLength != null &&
        payload.disposerCone != null &&
        payload.washLength != null &&
        payload.rinseLength != null &&
        payload.sanitizeLength != null
      ) {
        cleanDrainboardlength =
          payload.unitLength -
          (leftsplashLength +
            rightsplashLength +
            payload.soildDrainBoard +
            payload.scrapLength +
            payload.distanceBtwSandD +
            payload.disposerLength +
            payload.disposerCone +
            payload.collectorLength +
            payload.washLength +
            payload.rinseLength +
            payload.sanitizeLength);
        //document.getElementById('cleandrainboard').value=cleanDrainboardlength;
        state.psconfig.drainValue = cleanDrainboardlength;
      }
    }
  }),

  // count: computed(state => state.productIds.length),
};

export default psconfigmodel;
