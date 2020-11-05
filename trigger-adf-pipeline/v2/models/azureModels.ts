/*
 * Azure Pipelines Azure Datafactory Pipeline Task
 *
 * Copyright (c) 2020 Jan Pieter Posthuma / DataScenarios
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

import {
    getInput,
    getEndpointDataParameter,
    getEndpointAuthorizationParameter,
    getEndpointUrl,
    loc,
} from "azure-pipelines-task-lib/task";

export class AzureModels {
    private connectedServiceName: string;
    private subscriptionId: string;
    private subscriptionName: string;
    private servicePrincipalClientId: string;
    private servicePrincipalKey: string;
    private environmentAuthorityUrl: string;
    private tenantId: string;
    private url: string;

    constructor(connectedServiceName: string) {
        try {
            this.connectedServiceName = connectedServiceName;
            if (this.connectedServiceName === "local") {
                // local debug
                this.subscriptionId = <string>getInput("subscriptionid", true);
                this.subscriptionName = <string>getInput("subscriptionname", true);
                this.servicePrincipalClientId = <string>getInput("serviceprincipalid", true);
                this.servicePrincipalKey = <string>getInput("serviceprincipalkey", true);
                this.environmentAuthorityUrl = <string>getInput("environmentAuthorityUrl", true);
                this.tenantId = <string>getInput("tenantid", true);
                this.url = <string>getInput("connectedServiceNameUrl", true);
            } else {
                this.subscriptionId = getEndpointDataParameter(this.connectedServiceName, "subscriptionid", true);
                this.subscriptionName = getEndpointDataParameter(this.connectedServiceName, "subscriptionname", true);
                this.servicePrincipalClientId = <string>(
                    getEndpointAuthorizationParameter(this.connectedServiceName, "serviceprincipalid", true)
                );
                this.servicePrincipalKey = <string>(
                    getEndpointAuthorizationParameter(this.connectedServiceName, "serviceprincipalkey", true)
                );
                this.environmentAuthorityUrl = getEndpointDataParameter(
                    this.connectedServiceName,
                    "environmentAuthorityUrl",
                    true
                );
                this.tenantId = <string>getEndpointAuthorizationParameter(this.connectedServiceName, "tenantid", false);
                this.url = getEndpointUrl(this.connectedServiceName, true);
            }
        } catch (err) {
            throw new Error(loc("AzureModels_ConstructorFailed", err.message));
        }
    }

    public getSubscriptionId(): string {
        return this.subscriptionId;
    }

    public getSubscriptionName(): string {
        return this.subscriptionName;
    }

    public getServicePrincipalClientId(): string {
        return this.servicePrincipalClientId;
    }

    public getServicePrincipalKey(): string {
        return this.servicePrincipalKey;
    }

    public getEnvironmentAuthorityUrl(): string {
        return this.environmentAuthorityUrl;
    }

    public getTenantId(): string {
        return this.tenantId;
    }

    public getUrl(): string {
        return this.url;
    }
}
