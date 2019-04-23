/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {ba_timetracker.models.transactions.CreateTimeEntry} createTimeEntry
 * @transaction
 */
async function createTimeEntry(tx) {

    let timeAsset = await getFactory().newResourse(
        'ba_timetracker.models.assets',
        'TimeEntry',
        uuid4()
    );
    timeAsset.comment = tx.comment;
    timeAsset.description = tx.description;
    timeAsset.employee = tx.employee;
    timeAsset.duration = tx.duration;

    return getAssetRegistry("ba_timetracker.models.assets.TimeEntry")
        .then(assetRegistry => {
            return assetRegistry.add(timeAsset);
        })
        .then(() => {
            let event = getFactory().newEvent(
                'ba_timetracker.models.transactions',
                'CreateTimeEntryEvent'
            );
            event.timeEntry = timeAsset;
            emit(event);
        });
}

function uuid4() {
    // return uuid of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    var uuid = '', ii;
    for (ii = 0; ii < 32; ii += 1) {
        switch (ii) {
            case 8:
            case 20:
                uuid += '-';
                uuid += (Math.random() * 16 | 0).toString(16);
                break;
            case 12:
                uuid += '-';
                uuid += '4';
                break;
            case 16:
                uuid += '-';
                uuid += (Math.random() * 4 | 8).toString(16);
                break;
            default:
                uuid += (Math.random() * 16 | 0).toString(16);
        }
    }
    return uuid;
};
