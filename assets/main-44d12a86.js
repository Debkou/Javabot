import{b as c}from"./init-d40afb2b.js";console.log("Script started successfully");let e;WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),WA.room.area.onEnter("clock").subscribe(()=>{const o=new Date,t=o.getHours()+":"+o.getMinutes();e=WA.ui.openPopup("clockPopup","It's "+t,[])}),WA.room.area.onLeave("clock").subscribe(r),c().then(()=>{console.log("Scripting API Extra ready")}).catch(o=>console.error(o))}).catch(o=>console.error(o));function r(){e!==void 0&&(e.close(),e=void 0)}
