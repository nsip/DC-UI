(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d0c7710"],{5142:function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",{attrs:{id:"courseplan"}},[a("div",{staticStyle:{margin:"100px 0 0 100px",color:"gray"}},[a("h4",[a("img",{staticClass:"img-item",attrs:{src:t("f948")}}),a("b",[e._v(e._s(e.coursename)+" Lesson Planner\n            ")])]),e._m(0)]),a("hr",{staticClass:"line"}),a("div",{staticClass:"row courseplan"},[a("transition",{attrs:{name:"slide-fade"}},[e.isShow?e._e():a("div",{staticClass:"col-3",staticStyle:{"padding-right":"10px"}},[a("app-couser-reminder",{attrs:{course:e.course,coursename:e.coursename,selectedarea:e.selectedarea,selectedcourse:e.selectedcourse,selectedstage:e.selectedstage}})],1)]),a("div",{class:e.isShow?"col-9":"col-6"},e._l(e.lessons,function(s,t){return a("div",{key:t,staticClass:"editor",style:s.isDisplay?"display:block":"display:none"},[a("q-editor",{attrs:{"toolbar-text-color":"white","toolbar-outline":"","toolbar-bg":"deep-purple-4","min-height":"40rem",toolbar:[["bold","italic","underline"],["token","hr","link","custom_btn"],[{label:e.$q.i18n.editor.formatting,icon:e.$q.icon.editor.formatting,list:"no-icons",options:["p","h1","h2","h3","h4","h5","h6","code"]},{label:e.$q.i18n.editor.defaultFont,icon:e.$q.icon.editor.font,fixedIcon:!0,list:"no-icons",options:["default_font","arial","arial_black","comic_sans","courier_new","impact","lucida_grande","times_new_roman","verdana"]},"removeFormat"],[{label:e.$q.i18n.editor.align,icon:e.$q.icon.editor.align,fixedLabel:!0,options:["left","center","right","justify"]}],["fullscreen"],["undo","redo"]],fonts:{arial:"Arial",arial_black:"Arial Black",comic_sans:"Comic Sans MS",courier_new:"Courier New",impact:"Impact",lucida_grande:"Lucida Grande",times_new_roman:"Times New Roman",verdana:"Verdana"}},model:{value:s.editcontent,callback:function(t){e.$set(s,"editcontent",t)},expression:"lesson.editcontent"}}),a("q-list",{staticClass:"bottom-tips"},[a("q-item",[a("q-item-side",[a("p",[e._v("Title: "+e._s(s.summary))])]),a("q-item-main",{staticStyle:{"text-align":"center"},attrs:{"text-color":"dark"}},[a("p",{staticStyle:{"font-size":"14px"}},[a("i",{staticClass:"far fa-smile",staticStyle:{"margin-right":"10px"}}),e._v("Please remeber click save button, when you make any changes.")])]),a("q-item-side",{attrs:{right:""}},[a("p",[e._v("Lesson No."+e._s(t+1))])])],1)],1),a("div",{staticStyle:{float:"right",margin:"30px 0"}},[a("q-btn",{attrs:{label:"Save this lesson",outline:"",rounded:"",color:"deep-purple-9",icon:"save"},on:{click:function(s){e.save(t)}}})],1)],1)})),a("div",{staticClass:"col-3",staticStyle:{"padding-left":"10px"}},[a("q-chips-input",{staticClass:"search-input",attrs:{inverted:"",color:"deep-purple-4","chips-color":"dark","chips-bg-color":"white","float-label":"Enter the key words"},on:{keyup:e.search},model:{value:e.keywords,callback:function(s){e.keywords=s},expression:"keywords"}}),a("div",{staticClass:"search"},[a("q-list",{staticClass:"searchResult"},e._l(e.searchResult,function(s){return a("q-item",{key:s.URL},[a("q-item-side",[a("q-checkbox",{attrs:{color:"deep-purple-6",val:s},model:{value:e.seletedurl,callback:function(s){e.seletedurl=s},expression:"seletedurl"}})],1),a("q-item-main",[a("a",{staticClass:"urllink",attrs:{href:s.URL,target:"_blank"}},[e._v(e._s(s.Name))]),a("q-tooltip",{staticClass:"tip",attrs:{anchor:"bottom middle",self:"top middle",offset:[10,10]}},[e._v("\n                        "+e._s(s.Snippet)+"\n                      ")])],1)],1)})),a("q-list",{staticClass:"bottom-tips"},[a("q-item",[a("q-item-side",{staticStyle:{"text-align":"center"}},[a("i",{staticClass:"far fa-smile"})]),a("q-item-main",[a("p",{staticClass:"tips"},[e._v("Please remeber click save button when you make any change in each lesson.")])])],1)],1)],1)],1),a("q-card",{staticClass:"col-9 l list-of-lesson"},[a("q-card-title",{staticClass:"relative-position q-ma-sm"},[a("b",{staticStyle:{color:"gray"}},[e._v("List of "+e._s(e.coursename)+" Lesson")]),a("q-btn",{staticClass:"absolute",staticStyle:{right:"8px"},attrs:{icon:"fas fa-plus",outline:"",rounded:"",flat:"",color:"deep-purple-9"},on:{click:e.add}}),a("q-card-separator",{staticStyle:{"margin-top":"15px","margin-bottom":"15px"}}),a("span",{attrs:{slot:"subtitle"},slot:"subtitle"},[a("img",{staticClass:"lesson-sequence-logo",attrs:{src:t("6e2c")}}),a("q-field",{staticClass:"lesson-sequence-input",attrs:{"label-width":2,label:"Lesson Sequence"}},[a("q-input",{attrs:{color:"deep-purple-9"},model:{value:e.description,callback:function(s){e.description=s},expression:"description"}})],1)],1)],1),a("q-item-separator"),a("q-card-main",{staticClass:"lesson-list"},[a("draggable",{staticClass:"row",staticStyle:{"text-align":"center",position:"relative"},attrs:{options:{handle:".my-handle"}},model:{value:e.lessons,callback:function(s){e.lessons=s},expression:"lessons"}},e._l(e.lessons,function(s,t){return a("div",{key:t,staticClass:"col-lg-2 col-md-4 col-sm-6 col-xs-12"},[a("q-list",{staticClass:"q-ma-xs addLesson"},[a("q-item",[a("q-item-side",{attrs:{left:""}},[a("q-icon",{staticClass:"my-handle q-ma-sm",attrs:{name:"fas fa-bars","aria-hidden":"true",size:"18px",color:"blue-grey-3"}})],1),a("q-item-main"),a("q-item-side",{attrs:{right:""}},[a("q-btn",{staticClass:"q-ma-xs",attrs:{icon:"fas fa-trash-alt",size:"8px",outline:"",round:""},on:{click:function(s){e.removeLesson(t)}}})],1)],1),a("q-item",[a("q-btn",{staticStyle:{color:"#4527a0",width:"100%"},attrs:{outline:"",rounded:""},on:{click:function(s){e.selectedLesson(t)}}},[e._v("Lesson "+e._s(t+1))])],1),a("q-item",[a("div",[a("q-input",{staticClass:"q-ma-sm",attrs:{color:"deep-purple-5",placeholder:"Lesson title"},model:{value:s.summary,callback:function(t){e.$set(s,"summary",t)},expression:"lesson.summary"}})],1)])],1)],1)}))],1),a("q-item-separator"),a("q-card-title",{staticClass:"relative-position q-ma-sm"},[a("b",{staticStyle:{color:"gray"}},[e._v("Learning Arae: "+e._s(e.selectedarea)+" | Subject: "+e._s(e.selectedcourse)+" | Stage: "+e._s(e.selectedstage))]),a("div",{staticClass:"row items-center",attrs:{slot:"right"},slot:"right"},[a("q-btn",{attrs:{flat:"",outline:"",color:"deep-purple-5",label:"Submit All Lessons"},on:{click:e.submit}})],1)])],1),a("q-card",{staticClass:"col-3 l list-of-link"},[a("q-card-title",{staticClass:"relative-position q-ma-sm"},[a("img",{staticClass:"img-item link-logo",attrs:{src:t("e03b")}}),a("b",{staticStyle:{color:"gray"}},[e._v("Related Resouse Link")]),a("q-card-separator",{staticStyle:{"margin-top":"15px","margin-bottom":"15px"}})],1),a("q-card-main",{staticClass:"link-list q-ma-xs",staticStyle:{color:"gray"}},e._l(e.seletedurl,function(s,t){return a("q-item",{key:t},[a("q-item-side",[a("q-btn",{attrs:{flat:"",round:"",icon:"fas fa-minus-circle",outline:"",color:"deep-purple-5"},on:{click:function(s){e.deletelink(t)}}})],1),a("a",{staticClass:"urllink",attrs:{href:s.URL,target:"_blank"}},[e._v(e._s(s.Name))])],1)}))],1)],1),a("div",{staticClass:"left-btn"},[a("q-btn",{attrs:{push:"",icon:"fas fa-info-circle",align:"between",label:"Get lesson inforamtion",color:"deep-purple-9"},on:{click:function(s){e.isShow=!e.isShow}}})],1)])},i=[function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("p",[t("i",[e._v("Design the lesson in the editor, add the lesson by clicking the add button, and delete the lesson by clicking the delete button")])])}];a._withStripped=!0;t("7f7f");var l=t("1d7a"),o=t("1516"),n=t.n(o),r=t("77e2"),c={props:["course","selectedarea","selectedcourse","selectedstage","username"],components:{appCouserReminder:l["a"],draggable:n.a},data:function(){return{lessonId:void 0,lessons:[{course_number:0,summary:"A",editcontent:"Content 1",isDisplay:!0,url:"",start:{dateTime:""},end:{dateTime:""}}],j:0,isShow:!0,blockRemoval:!0,coursename:"",keywords:[],searchResult:[],seletedurl:[]}},created:function(){this.coursename=this.course.name},watch:{lessons:function(){this.blockRemoval=this.lessons.length<=1},coursename:function(){console.log(this.coursename),console.log(this.selectedarea),console.log(this.selectedcourse),console.log(this.selectedstage),console.log(this.lessons.length)}},methods:{save:function(e){},add:function(){var e,s=this.lessons.length;for(e=0;e<this.lessons.length;e++)this.lessons[e].isDisplay=!1;this.seletedurl=[],this.lessons.push({course_number:s++,editcontent:"",summary:"",isDisplay:!0,url:"",start:{dateTime:""},end:{dateTime:""}})},selectedLesson:function(e){var s;for(s=0;s<this.lessons.length;s++)this.lessons[s].isDisplay=!1;this.lessons[e].isDisplay=!0,""===this.lessons[e].url?this.seletedurl=[]:this.seletedurl=this.lessons[e].url},submit:function(){var e=this,s=this.description,t=this.lessons,a=this.selectedarea,i=this.course.name,l=this.selectedcourse,o=this.selectedstage,n=this.username;this.$q.loading.show({spinner:r["a"],spinnerColor:"amber",spinnerSize:100,message:"Updating the content..."}),setTimeout(function(){e.$q.loading.hide(),e.$store.dispatch("user/post",{submitLessons:t,area:a,course:i,subject:l,stage:o,description:s,userid:n})},3e3)},removeLesson:function(e){this.blockRemoval||(e===this.lessons.length-1?(this.lessons[e-1].isDisplay=!0,this.lessons.splice(e,1)):this.lessons.splice(e,1))},deletelink:function(e){this.seletedurl.splice(e,1)},search:function(){var e=this,s=t("bc3a");s({url:"http://localhost:1330/search/graphql",method:"post",data:{query:"query SearchQuery($terms: SearchInput) {\n            searchRequest(terms: $terms) {\n              WebPages {\n                Value {\n                  Name\n                  URL\n                  DisplayURL\n                  Snippet\n                }\n              }\n            }\n          }",variables:{terms:{learning_area:"hise",subject:this.selectedcourse,stage:this.selectedstage,course_name:this.coursename,content_area:this.selectedarea,keywords:this.keywords}}}}).then(function(s){e.searchResult=s.data.data.searchRequest.WebPages.Value})}}},d=c,u=t("2877"),m=Object(u["a"])(d,a,i,!1,null,null,null);m.options.__file="CoursePlan.vue";s["default"]=m.exports}}]);