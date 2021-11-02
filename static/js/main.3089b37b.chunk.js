(this["webpackJsonpgoit-react-hw-03-image-finder"]=this["webpackJsonpgoit-react-hw-03-image-finder"]||[]).push([[0],{15:function(e,t,n){},16:function(e,t,n){},17:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(9),s=n.n(c),o=(n(15),n(3)),i=n(4),u=n(6),l=n(5),h=(n(16),n(17),n(1)),p=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(o.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={request:" "},e.handleSubmit=function(t){t.preventDefault(),e.props.onSubmit(e.state.request)},e.handleNameChange=function(t){e.setState({request:t.currentTarget.value.toLowerCase()})},e}return Object(i.a)(n,[{key:"render",value:function(){var e=this.state.request;return Object(h.jsx)("header",{className:"Searchbar",children:Object(h.jsxs)("form",{className:"SearchForm",onSubmit:this.handleSubmit,children:[Object(h.jsx)("button",{type:"submit",className:"SearchForm-button",children:Object(h.jsx)("span",{className:"SearchForm-button-label",children:"Search"})}),Object(h.jsx)("input",{className:"SearchForm-input",type:"text",autoComplete:"off",autoFocus:!0,placeholder:"Search images and photos",value:e,onChange:this.handleNameChange})]})})}}]),n}(a.Component),j=p,b=n(8);function d(e){var t=e.pic,n=(t.id,t.previewURL),a=t.tags;return Object(h.jsx)("li",{className:"ImageGalleryItem",children:Object(h.jsx)("img",{src:n,alt:a,className:"ImageGalleryItem-image"})})}var m={fetchPictures:function(e,t){return fetch("https://pixabay.com/api/?q=".concat(e,"&page=").concat(t,"&key=23343494-643d22eb41994b430f7c237c0&image_type=photo&orientation=horizontal&per_page=12")).then((function(t){return t.ok?t.json():Promise.reject(new Error("\u041d\u0435\u0442 \u043a\u0430\u0440\u0442\u0438\u043d\u043e\u043a \u043f\u043e \u0437\u0430\u043f\u0440\u043e\u0441\u0443 ".concat(e)))}))}},f=n(10),g=n.n(f),O=(n(39),function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return Object(h.jsx)(g.a,{type:"Puff",color:"#00BFFF",height:100,width:100,timeout:3e3})}}]),n}(a.Component)),v=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(o.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={pageNum:2},e.changePage=function(){var t=e.state.pageNum+1;e.setState({pageNum:t}),console.log(e.state),window.scrollTo({top:document.documentElement.scrollHeight,behavior:"smooth"}),e.props.onPageChange(e.state.pageNum)},e}return Object(i.a)(n,[{key:"render",value:function(){return Object(h.jsx)("button",{type:"button",className:"Button",onClick:this.changePage,children:"Load more"})}}]),n}(a.Component),y=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(o.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={pictures:[],status:"idle",error:null,page:1},e.onPageChange=function(t){e.setState({page:t})},e}return Object(i.a)(n,[{key:"componentDidUpdate",value:function(e,t){var n=this,a=e.request,r=this.props.request,c=t.page,s=this.state.page;a===r&&c===s||(this.setState({status:"pending"}),m.fetchPictures(r,s).then((function(e){var t=[].concat(Object(b.a)(n.state.pictures),Object(b.a)(e.hits));return n.setState({pictures:t,status:"resolved"}),console.log(t),e})).then((function(e){if(0===e.total)return n.setState({status:"notfound"})})).catch((function(e){return n.setState({error:e,status:"rejected"})})))}},{key:"render",value:function(){var e=this.state,t=e.pictures,n=e.status,a=e.error,r=this.props.request;return"idle"===n?Object(h.jsx)("div",{children:" There will be pictures for you request..."}):"pending"===n?Object(h.jsx)(O,{}):"notfound"===n?Object(h.jsxs)("div",{children:["We did't find pictures for request ",r]}):"rejected"===n?Object(h.jsxs)("div",{children:["We have a problem ",a]}):"resolved"===n?Object(h.jsxs)("div",{children:[Object(h.jsx)("ul",{className:"ImageGallery",children:t.map((function(e){return Object(h.jsx)(d,{pic:e},e.id)}))}),Object(h.jsx)(v,{onPageChange:this.onPageChange})]}):void 0}}]),n}(a.Component),x=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(o.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={request:" "},e.submiteData=function(t){e.setState({request:t})},e}return Object(i.a)(n,[{key:"render",value:function(){var e=this.state.request;return Object(h.jsxs)("div",{className:"App",children:[Object(h.jsx)(j,{onSubmit:this.submiteData}),Object(h.jsx)(y,{request:e})]})}}]),n}(a.Component),S=x,C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,41)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))};s.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(S,{})}),document.getElementById("root")),C()}},[[40,1,2]]]);
//# sourceMappingURL=main.3089b37b.chunk.js.map