/*
 * Azure Pipelines Azure Datafactory Deploy Task
 *
 * Copyright (c) 2021 Jan Pieter Posthuma / DataScenarios
 *
 * All rights reserved.
 *
 * MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

"use strict";

import { AzureServiceClient } from "@azure/ms-rest-azure-js";

import { SortingDirection, DatafactoryTypes } from "./enums";

export interface DatafactoryOptions {
    azureClient?: AzureServiceClient;
    azureManagementUri: string;
    subscriptionId: string;
    resourceGroup: string;
    dataFactoryName: string;
}

export interface DatafactoryTaskOptions {
    continue: boolean;
    throttle: number;
    sorting: SortingDirection;
    detectDependency: boolean;
}

export interface DatafactoryTaskObject {
    name: string;
    json: string;
    size: number;
    type: DatafactoryTypes;
    dependency: string[];
    bucket: number;
}

export type DeleteTask = {
    filter: string;
    type: DatafactoryTypes;
};

export type ADFJson = {
    name: string;
    referenceName: string;
    type: string;
    [keys: string]: ADFJson | boolean | number | string;
};
