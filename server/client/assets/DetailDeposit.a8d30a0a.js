var e=Object.assign;import{d as a,n as t,i,h as s,r as l,o as n,c as o,p as r,v as c,a as u,t as d,w as g,k as m}from"./index.b73d235c.js";import{u as f}from"./UserState.b166659e.js";import{u as b}from"./TabunganState.8fbe1fea.js";import{_ as p,u as x}from"./NoData.b9c4e8ee.js";import{_ as h,a as v,b as k,c as w,d as y}from"./DialogLoading.5e306746.js";import"./Services.3fb9b37a.js";var D=a({components:{BaseDialog:h,DialogLoading:v,DialogResult:k,IconFailed:w,IconSuccess:y,NoData:p},setup(){const a=s(),{getProfil:l,UserState:n}=f(),{getDepositById:o,acceptDeposit:r}=b(),c=t({sender:"",nominal:"",receipt:"",receiptname:"",accepted:"",description:"",tabungantype:"deposit",created:0,updated:0}),u=t(!1);return i((()=>{l(),o().then((e=>{e?(u.value=!1,c.value=e[0]):u.value=!0,console.log(c.value.sender!=n.profil.uid),console.log(""==c.value.accepted)}))})),e(e(e({UserState:n,route:a,verifikasiDeposit:function(){r(n.profil.uid,c.value._id)}},b()),x()),{tabungan:c,noData:u})}});const j={class:"h-full w-full px-8 py-20 bg-gray-900"},S={class:"flex lg:flex-row flex-col items-center min-h-screen",style:{"font-family":"'Poppins', sans-serif"}},_={class:"w-full lg:w-1/2 text-center justify-center flex lg:mb-0 mb-12"},O={class:"lg:w-1/2 w-full flex flex-col lg:items-start items-center lg:text-left text-center"},U=u("h2",{class:"md:text-4xl text-3xl text-white font-semibold mb-10 tracking-tight"}," Tabungan ",-1),N={class:"mb-8"},Y={class:"font-medium text-2xl text-white mb-5 flex lg:flex-row flex-col items-center lg:justify-start justify-center"},C=u("p",{class:"text-base leading-7 tracking-wide sm:inline-block hidden caption-content-3-3"},[m(" We have provided highly experienced mentors"),u("br"),m(" for several years. ")],-1),H=m(" Kembali "),I={class:"mb-6 text-base leading-7 tracking-wide inline-block sm:hidden caption-content-3-3"};D.render=function(e,a,t,i,s,m){const f=l("no-data"),b=l("router-link"),p=l("dialog-loading"),x=l("base-dialog"),h=l("icon-failed"),v=l("dialog-result"),k=l("icon-success");return n(),o("section",j,[r(u(f,{class:"min-h-screen",title:"Uuups",text:"Gagal mengambil detail \n coba nanti agi ya..",button:"Okedeh"},null,8,["text"]),[[c,e.noData]]),r(u("div",S,[u("div",_,[u("img",{class:"rounded-lg",src:e.tabungan.receipt,alt:""},null,8,["src"])]),u("div",O,[U,u("ul",null,[u("li",N,[u("h4",Y,d(e.format(e.tabungan.nominal,"Rp")),1),C])]),r(u("button",{onClick:a[1]||(a[1]=(...a)=>e.verifikasiDeposit&&e.verifikasiDeposit(...a)),class:"mb-6 btn-fill-content-3-3 px-10 py-4 text-base text-white font-semibold rounded-xl cursor-pointer focus:outline-none tracking-wide"}," Terima ",512),[[c,e.tabungan.sender!=e.UserState.profil.uid&&e.tabungan.accepted.length<1]]),u(b,{to:"/main/dashboard",class:"mb-6 px-10 py-4 text-base text-white font-semibold rounded-xl cursor-pointer focus:outline-none tracking-wide"},{default:g((()=>[H])),_:1}),u("p",I,d(e.route.params.id),1)])],512),[[c,!e.noData]]),u(x,{show:e.isLoading(),dissmisable:!1},{default:g((()=>[u(p)])),_:1},8,["show"]),u(x,{show:e.isDialogResult(),dissmisable:!0,onOnDismis:a[4]||(a[4]=a=>e.dismiss())},{default:g((()=>[e.isDialogSuccess()?(n(),o(v,{key:1,title:"Yuhuuu..",message:"Selamat! kamu berhasil menabung yuk tingkatkan lagi",positive:"Oke Coba lagi",negative:"Yaudah kembali",onOnNegative:a[3]||(a[3]=a=>e.gotoHome())},{default:g((()=>[u("div",null,[u(k)])])),_:1},8,["title"])):(n(),o(v,{key:0,title:"Yaah..",message:"Gagal verifikasi nih..Hal kaya gini normal sih bisanya si server lagi cape..",positive:"Oke Coba lagi",negative:"Yaudah kembali",onOnNegative:a[2]||(a[2]=a=>e.gotoHome())},{default:g((()=>[u("div",null,[u(h)])])),_:1},8,["title","message"]))])),_:1},8,["show"])])};export default D;
