class Apifeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $reqex:this.queryStr.keyword,
                $options:"i",
            },
        }:{
            // this will happen when keyword is not found
        }

        this.query = this.query.find({...keyword});
        return this;
    }
    

    filter(){
        const queryCopy = {...this.querystr}; // copying the query string

        const removefield = ["keyword","page","limit"]

        // console.log(queryCopy)
        // removing the fields from the query
        removefield.forEach(key => delete queryCopy[key]);
        // console.log(queryCopy)

        let queryStr = JSON.stringify(queryCopy);
        queryStr =queryStr.replace(/\b(gt|gte|It|Ite)\b/g,key=>`$${key}`);
        // console.log(queryStr)

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultperpage){
        const currentpage = Number(this.queryStr.page)||1;
        // current page number
        const skip  = resultperpage*(currentpage-1)
        // current page number * result per page
        this.query  =  this.query.limit(resultperpage).skip(skip);
        

        return this;

    }
}

export default Apifeatures;