
/**
 * 打开数据库
 * @param {string} dbName 数据库的名字
 * @param {number} version 数据库的版本
 * @param {string} storeName 仓库名称
 * @param {string} priKey 主键
 * @param {string[]} index 索引数组
 * @return {Promise<IDBDatabase>} 返回一个数据库实例的 Promise
 */
export const openDB = function openDB(
    dbName: string,
    version: number = 1,
    storeName: string,
    priKey: string,
    index: string[]
): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        //兼容浏览器
        const indexedDB = window.indexedDB ||
            (window as any).mozIndexedDB ||
            (window as any).webkitIndexedDB ||
            (window as any).msIndexedDB;

        let db: IDBDatabase;

        //打开数据库，若没有则创建
        const request = indexedDB.open(dbName, version);

        //数据库打开成功回调
        request.onsuccess = function (event) {
            db = (event.target as IDBOpenDBRequest).result;//数据库对象
            resolve(db);
        }

        //数据库打开失败的回调
        request.onerror = function () {
            console.error("数据库打开报错");
            reject("数据库带开失败")
        }

        //数据库有更新的时候回调
        request.onupgradeneeded = function (event) {
            console.log("创建成功");
            db = (event.target as IDBOpenDBRequest).result;
            const objectStore = db.createObjectStore(storeName, {
                keyPath: priKey,//这是主键
                autoIncrement: true //实现自增
            });

            //创建索引
            objectStore.createIndex(priKey, priKey, { unique: true });
            index.forEach((idx) => {
                objectStore.createIndex(idx, idx, { unique: false });
            })
        }
    })
}

/**
 * 新增数据
 * @param {IDBDatabase} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {object} data 数据
 */
export const addData = function addData(db: IDBDatabase, storeName: string, data: object){
    const request = db.transaction([storeName], "readwrite")
        .objectStore(storeName)
        .add(data);
    
    request.onsuccess = function() {
        console.log("数据写入成功");
    };

    request.onerror = function () {
        console.error("数据写入失败");
    };
}

/**
 * 删除数据库
 * @param dbName 数据库名
 * @returns 
 */
export const deleteData = function deleteData(dbName: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.deleteDatabase(dbName);

        request.onsuccess = () => {
            console.log(`Database ${dbName} deleted successfully`);
            resolve();
        }

        request.onerror = (event) => {
            console.error(`Error deleting database ${dbName}:`, event);
            reject(event);
        }

        request.onblocked = () => {
            console.warn(`Deletion of database ${dbName} is blocked.`);
        }
    })
}

/**
 * 删除对象存储
 * @param dbName 数据库名
 * @param storeName 数据表名
 * @returns 
 */
export const deleteObjectStore = function deleteObjectStore(dbName: string, storeName: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName);

        request.onupgradeneeded = (event) => {
            const db = request.result;
            if (db.objectStoreNames.contains(storeName)) {
                db.deleteObjectStore(storeName);
                console.log(`Object store ${storeName} deleted successfully`);
            }
        };

        request.onsuccess = () => {
            request.result.close();
            resolve();
        };

        request.onerror = (event) => {
            console.error(`Error deleting object store ${storeName}:`, event);
            reject(event);
        };
    });
};


/**
 * 获取所有数据库
 * @returns 
 */
export const listAllDatabase = async (): Promise<IDBDatabaseInfo[]> => {
    if(!indexedDB.databases){
        console.warn("Your browser does not support the indexedDB.databases() method.");
        return [];
    }

    try {
        const database = await indexedDB.databases();

        return database;
    } catch (error) {
        console.error("Error while listing databases:", error);
        return [];
    }

}

/**
 * 通过主键读取数据
 * @param {IDBDatabase} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string | number} key 主键值
 * @return {Promise<any>} 返回一个 Promise，解析为查询结果
 */
export const getDataByKey = function getDataByKey(db: IDBDatabase, storeName: string, key: string | number): Promise<any> {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName]);
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.get(key);

        request.onerror = function () {
            console.error("事务失败");
            reject("事务失败");
        }

        request.onsuccess = function () {
            console.log("主键查询结果：", request.result);
            resolve(request.result);
        }
    })
}

/**
 * 通过游标读取数据
 * @param {IDBDatabase} db 数据库实例
 * @param {string} storeName 仓库名称
 */
export const cursorGetData = function cursorGetData(db: IDBDatabase, storeName: string, use_message: any) {
    const list: any[] = [];
    const store = db.transaction(storeName, "readwrite").objectStore(storeName);
    const request = store.openCursor();

    request.onsuccess = function(e) {
        const cursor = (e.target as IDBRequest).result;
        if(cursor) {
            list.push(cursor.value);
            use_message.saveMessage(cursor.value)
            cursor.continue();//遍历存储对象所有内容
        } else {
            console.log("游标读取数据：", list);
        }
    }
}

/**
 * 游标从后往前分页查询
 * @param {IDBDatabase} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {number} page 页码
 * @param {number} pageSize 每页大小
 * @param {number | null} skip 跳过的条数
 * @returns {Promise<any[]>} 返回一个 Promise，解析为查询结果
 */
export const cursorGetDataAndPage = function cursorGetDataAndPage(
    db: IDBDatabase,
    storeName: string,
    page: number,
    pageSize: number,
    skip: number | null = null
  ): Promise<any[]>{
    return new Promise((resolve, reject) => {
        console.log('#skip', skip);
        const list: any[] = [];
        let counter = 0; //计数器
        let advanced = true; //是否跳过多少条查询
        const store = db.transaction(storeName,"readwrite").objectStore(storeName);
        const request = store.openCursor(null, "prev");

        request.onsuccess = function(e) {
            const cursor = (e.target as IDBRequest).result;

            if(page > 1 && advanced){
                advanced = false;
                cursor.advanced(skip || (page - 1) * pageSize);//跳过多少条
                return;
            }

            if(cursor){
                list.push(cursor.value);
                counter++;
                if(counter < pageSize){
                    cursor.continue(); //遍历存储对象中的所有内容
                } else {
                    resolve(list);
                    console.log("分页查询结果", list);
                }
            } else {
                resolve(list);
                console.log("分页查询结果",list);
            }
        };
        request.onerror = function (){
            reject("#数据库查询失败");
        }
    })
}

/**
 * 通过索引和游标查询记录
 * @param {IDBDatabase} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名称
 * @param {string | number} indexValue 索引值
 */
export const cursorGetDataByIndex = function cursorGetDataByIndex(
    db: IDBDatabase,
    storeName: string,
    indexName: string,
    indexValue: string | number
  ) {
    const list: any[] = [];
    const store = db.transaction(storeName, "readwrite").objectStore(storeName);
    const request = store.index(indexName).openCursor(IDBKeyRange.only(indexValue));

    request.onsuccess = function (e) {
        const cursor = (e.target as IDBRequest).result;
        if(cursor){
            list.push(cursor.value);
            cursor.continue(); //遍历了存储对象中的所有内容
        } else {
            console.log("游标索引查询结果:",list);
        }
    };
    request.onerror = function(){
        console.error("游标索引查询失败")
    }
}

/**
 * 通过索引和游标分页查询记录
 * @param {IDBDatabase} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名称
 * @param {string | number} indexValue 索引值
 * @param {number} page 页码
 * @param {number} pageSize 查询条数
 * @returns {Promise<any[]>} 返回一个 Promise，解析为查询结果
 */
export const cursorGetDataByIndexAndPage = function cursorGetDataByIndexAndPage(
    db: IDBDatabase,
    storeName: string,
    indexName: string,
    indexValue: string | number,
    page: number,
    pageSize: number
  ): Promise<any[]> {
    return new Promise((resolve) => {
        const list: any[] = [];
        let counter = 0; // 计数器
        let advanced = true; // 是否跳过多少条查询
        const store = db.transaction(storeName, "readwrite").objectStore(storeName);
        const request = store.index(indexName).openCursor(IDBKeyRange.only(indexValue));

        request.onsuccess = function (e) {
            const cursor = (e.target as IDBRequest).result;

            if (page > 1 && advanced) {
                advanced = false;
                cursor.advance((page - 1) * pageSize); // 跳过多少条
                return;
            }

            if (cursor) {
                list.push(cursor.value);
                counter++;
                if (counter < pageSize) {
                    cursor.continue(); // 遍历了存储对象中的所有内容
                } else {
                    console.log("分页查询结果", list);
                    resolve(list);
                }
            } else {
                console.log("分页查询结果", list);
                resolve(list);
            }
        };

        request.onerror = function () {
            console.error("游标索引分页查询失败");
        };
    });
  }