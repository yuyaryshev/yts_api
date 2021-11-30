export interface ValidationSettings {
    validateResponsesOnServer: boolean;
    validateResponsesOnClient: boolean;
    validateRequestsOnClient: boolean;
}

/*
 * Change these values to skip validation somewhere.
 * Recomendation: disable validation only on producion environments to boost performance.
 * Keep settings these true on develepment builds.
 **/
export const validationSettings = {
    validateResponsesOnServer: true,
    validateResponsesOnClient: true,
    validateRequestsOnClient: true,
};
