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

"use strict";

/**
 * Write your transction processor functions here
 */

 /**
 * return uuid of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 */
function uuid4() {
  var uuid = "",
    ii;
  for (ii = 0; ii < 32; ii += 1) {
    switch (ii) {
      case 8:
      case 20:
        uuid += "-";
        uuid += ((Math.random() * 16) | 0).toString(16);
        break;
      case 12:
        uuid += "-";
        uuid += "4";
        break;
      case 16:
        uuid += "-";
        uuid += ((Math.random() * 4) | 8).toString(16);
        break;
      default:
        uuid += ((Math.random() * 16) | 0).toString(16);
    }
  }
  return uuid;
}

/**
 * Sample transaction
 * @param {ba_timetracker.models.transactions.TransactionTrackTime} tx
 * @transaction
 */
function trackTime(tx) {
  const asset = getFactory().newResource(
    "ba_timetracker.models.assets",
    "AssetTimeEntry",
    uuid4()
  );

  asset.employee = tx.employee;
  asset.spentOn = tx.spentOn;
  asset.duration = tx.duration;
  asset.comment = tx.comment;

  return getAssetRegistry("ba_timetracker.models.assets.AssetTimeEntry")
    .then((registry) => {
      registry.add(asset);
    })
    .then(() => {
      return getFactory().newEvent(
        "ba_timetracker.models.transactions",
        "timeEntryCreated"
      );
    })
    .then(event => {
      event.asset = tx.asset;
      event.oldValue = oldValue;
      event.newValue = tx.newValue;
      emit(event);
    })
    .then(() => {
      return getAssetRegistry(
        "ba_timetracker.models.assets.AssetTimeEntry"
      );
    })
    
}