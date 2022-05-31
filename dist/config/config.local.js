"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 本地开发 npm run dev 读取的配置文件
 */
exports.default = {
    orm: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '',
        database: 'bonding',
        // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
        synchronize: true,
        // 打印日志
        logging: true,
        // 字符集
        charset: 'utf8mb4',
    },
    cool: {
        // 是否自动导入数据库
        initDB: true,
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmxvY2FsLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS9jYXNlL2JvbmRpbmcvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImNvbmZpZy9jb25maWcubG9jYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQTs7R0FFRztBQUNILGtCQUFlO0lBQ2IsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFLE9BQU87UUFDYixJQUFJLEVBQUUsV0FBVztRQUNqQixJQUFJLEVBQUUsSUFBSTtRQUNWLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLFFBQVEsRUFBRSxFQUFFO1FBQ1osUUFBUSxFQUFFLFNBQVM7UUFDbkIsZ0NBQWdDO1FBQ2hDLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLE9BQU87UUFDUCxPQUFPLEVBQUUsSUFBSTtRQUNiLE1BQU07UUFDTixPQUFPLEVBQUUsU0FBUztLQUNuQjtJQUNELElBQUksRUFBRTtRQUNKLFlBQVk7UUFDWixNQUFNLEVBQUUsSUFBSTtLQUNDO0NBQ0EsQ0FBQyJ9