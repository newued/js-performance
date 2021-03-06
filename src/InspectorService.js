var inspectorService = {
    initInspector:function(){
        var that = this;
        window.onerror = function(errorMessage, scriptURI, lineNo, columnNo, error){
            console.log('errorMessage: ' + errorMessage);
            console.log('scriptURI: ' + scriptURI);
            console.log('lineNo: ' + lineNo);
            console.log('columnNo: ' + columnNo);
          
            var stack = error.stack;
              console.log(stack);
            var errorMsgObj = {errorMessage, scriptURI, lineNo, columnNo, stack};
            console.log(errorMsgObj);
            that.uploadMsg(errorMsgObj);
        }
    },

    uploadMsg:function(msgObj){
        var xhr = new XMLHttpRequest();
        if('withCredentials' in xhr){
            console.log('withCredentials');
            // xhr.withCredentials = true;
        }else if(typeof XDomainRequest != 'undefined'){
                xhr = new XDomainRequest();
                // var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
                // var i, len;
                // for(i = 0, len = versions.length; i < len; i++){
                //     try {
                //          new ActiveXObject(versions[i]);
                //          arguments.callee.activeString = versions[i];
                //          break;
                //     } catch (error) {
                        
                //     }
                // }
                // xhr = new ActiveXObject(arguments.callee.activeString); 
        }
        if(xhr){
            xhr.open('post', 'http://localhost:9000/middleware/errorMsg', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(msgObj));
            xhr.onloadend = function(data){
                console.log(xhr.response);
            }
        }
    }
}
/**
 * NOTE 对于跨域的脚本，默认是无法捕获异常信息的，会统一返回Scripterror
 * 解决方案是在script中配置属性 crossOrigin="anonymous"并且服务器添加Access-Control-Allow-Origin
 * <script  src="" crossOrigin="anonymous"></script>
 */
inspectorService.initInspector();

module.exports = {inspectorService}
