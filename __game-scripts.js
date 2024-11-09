var TelegramProfile=pc.createScript("telegramProfile");TelegramProfile.prototype.initialize=function(){this.textElement=this.entity.element,window.Telegram&&window.Telegram.WebApp?(window.Telegram.WebApp.ready(),setTimeout((()=>{this.updateProfile()}),100),window.Telegram.WebApp.onEvent("viewportChanged",(()=>{this.updateProfile()}))):(this.textElement.text="Please open in Telegram",console.log("This app needs to be opened in Telegram"))},TelegramProfile.prototype.updateProfile=function(){const e=window.Telegram.WebApp;if(e.initDataUnsafe&&e.initDataUnsafe.user){const t=e.initDataUnsafe.user;t.username?this.textElement.text="@"+t.username:t.first_name?this.textElement.text=t.first_name:this.textElement.text="User found but no name"}else this.textElement.text="No user data"};var CameraAspect=pc.createScript("cameraAspect");CameraAspect.prototype.initialize=function(){this.currentOrthoHeight=this.entity.camera.orthoHeight},CameraAspect.prototype.update=function(t){var e=this.app.graphicsDevice.canvas,i=e.width/e.height,r=pc.math.clamp(.72/i,1,2);r!==this.currentOrthoHeight&&(this.entity.camera.orthoHeight=r,this.currentOrthoHeight=r)};var SceneLoader=pc.createScript("sceneLoader");SceneLoader.attributes.add("sceneRootEntity",{type:"entity"}),SceneLoader.attributes.add("loadButtonEntity",{type:"entity"}),SceneLoader.attributes.add("sceneFilename",{type:"string"}),SceneLoader.prototype.initialize=function(){var e=this;this._loadButton=this.loadButtonEntity.button,this._loadingScene=!1,this._loadButton.on("click",(function(t){e._loadScene()}))},SceneLoader.prototype._loadScene=function(){if(!this._loadingScene){this._loadingScene=!0,this._loadButton.active=!1,this.sceneRootEntity.children.length>0&&this.sceneRootEntity.children[0].destroy();var e=this,t=this.app.scenes.find(this.sceneFilename);this.app.scenes.loadSceneHierarchy(t,(function(t,n){t?console.error("Error loading scene:",t):(n.reparent(e.sceneRootEntity),e._loadingScene=!1,e._loadButton.active=!0)}))}};var AudioPlayer=pc.createScript("audioPlayer");AudioPlayer.attributes.add("musicAsset",{type:"asset",assetType:"audio"}),AudioPlayer.prototype.initialize=function(){this.entity.sound||this.entity.addComponent("sound"),this.musicAsset&&(this.entity.sound.addSlot("musicSlot",{asset:this.musicAsset,volume:1,loop:!0,autoplay:!1}),this.musicAsset.loaded?this.onAssetLoaded():(this.musicAsset.once("load",this.onAssetLoaded,this),this.app.assets.load(this.musicAsset)))},AudioPlayer.prototype.onAssetLoaded=function(){/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream?this.createPlayButton():this.entity.sound.play("musicSlot")},AudioPlayer.prototype.createPlayButton=function(){var t=document.createElement("div");t.style.position="absolute",t.style.width="100%",t.style.height="100%",t.style.top="0",t.style.left="0",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.backgroundColor="rgba(0, 0, 0, 0.5)",t.style.zIndex="1000";var e=document.createElement("button");e.textContent="Start Game",e.style.padding="20px 40px",e.style.fontSize="18px",e.style.backgroundColor="#ffffff",e.style.border="none",e.style.borderRadius="8px",e.style.cursor="pointer",t.appendChild(e),document.body.appendChild(t),t.addEventListener("click",(()=>{this.entity.sound.play("musicSlot"),document.body.removeChild(t)}))},AudioPlayer.prototype.destroy=function(){this.entity.sound&&this.entity.sound.stop("musicSlot")},AudioPlayer.prototype.pauseMusic=function(){this.entity.sound&&this.entity.sound.pause("musicSlot")},AudioPlayer.prototype.resumeMusic=function(){this.entity.sound&&this.entity.sound.resume("musicSlot")},AudioPlayer.prototype.setVolume=function(t){this.entity.sound&&(this.entity.sound.slots.musicSlot.volume=Math.max(0,Math.min(1,t)))};var ButtonToggle=pc.createScript("buttonToggle");ButtonToggle.attributes.add("targetEntity",{type:"entity",title:"Target Entity",description:"Entity to enable/disable when button is clicked"}),ButtonToggle.attributes.add("startDisabled",{type:"boolean",default:!0,title:"Start Disabled",description:"Should the target entity start disabled?"}),ButtonToggle.prototype.initialize=function(){this.button=this.entity.button,this.button?(this.targetEntity&&(this.targetEntity.enabled=!this.startDisabled),this.button.on("click",this.onButtonClick,this)):console.error("ButtonToggle script requires a button component!")},ButtonToggle.prototype.onButtonClick=function(){this.targetEntity&&(this.targetEntity.enabled=!this.targetEntity.enabled)},ButtonToggle.prototype.destroy=function(){this.button&&this.button.off("click",this.onButtonClick,this)};