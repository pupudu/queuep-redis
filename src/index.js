/**
 * Created by pubudud on 8/6/17.
 */

import Redis from 'redis';

let redis = Redis.createClient();

/**
 * Storage strategy for QueueP using application state as the medium
 */
export default class RedisStore {

    /**
     * Constructor
     * @param {string} [qId] - Optional Id for cross references
     */
    constructor(qId) {
        this.qId = qId;
    }

    /**
     * Fetch the entry with the target data from the data map(Redis or In-memory)
     *
     * @param {string} key - Key of the actual target data
     * @returns {Promise} <-
     */
    getEntry(key) {
        return new Promise((resolve, reject)=> {
            redis.hget(this.qId, key, (err, res) => {
                if (err) {
                    return reject(err);
                }
                if (!res) {
                    return resolve({});
                }
                return resolve(JSON.parse(res));
            });
        });
    }

    /**
     * Add an entry to the data-map
     *
     * @param {string} key - key of the target data
     * @param {Object} entry - Object consisting of the target data and the isDirty attribute
     * @returns {Promise} <-
     */
    setEntry(key, entry) {
        return new Promise((resolve, reject) => {
            redis.hset(this.qId, key, JSON.stringify(entry), (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    }

    /**
     * Set the isDirty of target entry to false to avoid adding similar items to the queuep queue
     * @param {string} key <-
     * @param {Object} entry <-
     * @return {Promise} - success or failure
     */
    markEntryAsDone(key, entry) {
        return new Promise((resolve, reject) => {
            entry.isDirty = false;

            this.setEntry(key, entry)
                .then(resolve)
                .catch(reject);
        });
    }
}
