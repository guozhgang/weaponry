var G_INCOMPAT = false;
function GScript(src) {
	document.write('<' + 'script src="' + src + '"'
			+ ' type="text/javascript"><' + '/script>');
}
function GBrowserIsCompatible() {
	if (G_INCOMPAT)
		return false;
	return true;
}
function GApiInit() {
	if (GApiInit.called)
		return;
	GApiInit.called = true;
	window.GAddMessages && GAddMessages({
		160 : '\x3cH1\x3e服务器错误\x3c/H1\x3e服务器暂时出现错误，可能无法处理您的申请。\x3cp\x3e请几分钟后重试。\x3c/p\x3e',
		1415 : '.',
		1416 : ',',
		1547 : '英里',
		1616 : '公里',
		4100 : '米',
		4101 : '英尺',
		10018 : '正在加载...',
		10021 : '放大',
		10022 : '缩小',
		10024 : '拖动缩放',
		10029 : '返回上一结果',
		10049 : '地图',
		10050 : '卫星',
		10093 : '使用条款',
		10111 : '地图',
		10112 : '卫星',
		10116 : '混合地图',
		10117 : '混合地图',
		10120 : '很抱歉，在这一缩放级别的地图上未找到此区域。\x3cp\x3e请缩小地图，扩大视野范围。\x3c/p\x3e',
		10121 : '很抱歉，在此缩放级别的卫星图像上，未找到该区域。\x3cp\x3e请缩小图像，扩大视野范围。\x3c/p\x3e',
		10507 : '向左平移',
		10508 : '向右平移',
		10509 : '向上平移',
		10510 : '向下平移',
		10511 : '显示街道地图',
		10512 : '显示卫星图片',
		10513 : '显示标有街道名称的图片',
		10806 : '点击可在 Google 地图上参看该区域',
		10807 : '路况',
		10808 : '显示路况',
		10809 : '隐藏路况',
		12150 : '在%2$s上有%1$s',
		12151 : '在%2$s与%3$s的交叉口有%1$s',
		12152 : '%2$s上的%3$s和%4$s的路口之间有%1$s',
		10985 : '放大',
		10986 : '缩小',
		11047 : '在此居中放置地图',
		11089 : '\x3ca href\x3d\x22javascript:void(0);\x22\x3e放大\x3c/a\x3e可查看该地区的路况',
		11259 : '全屏显示',
		11751 : '显示地形地图',
		11752 : '样式：',
		11757 : '更改地图样式',
		11758 : '地形',
		11759 : '地形',
		11794 : '显示标签',
		11303 : '街景视图帮助',
		11274 : '要使用街景视图，您需要 %1$d 或更新版本的 Adobe Flash Player。',
		11382 : '获取最新版 Flash 播放器。',
		11314 : '抱歉，由于需求量高，街景视图暂时不可用。\x3cbr\x3e请稍后再试！',
		1559 : '北',
		1560 : '南',
		1561 : '西',
		1562 : '东',
		1608 : '西北',
		1591 : '东北',
		1605 : '西南',
		1606 : '东南',
		11907 : '不再提供该图片',
		10041 : '帮助',
		12471 : '当前位置',
		12492 : '地球',
		12823 : 'Google 已禁止在此应用程序上使用地图 API。有关详情，请参阅服务条款：%1$s。',
		12822 : 'http://code.google.com/apis/maps/terms.html',
		12915 : '改进地图',
		12916 : 'Google, Europa Technologies',
		13171 : '混合 3D',
		0 : ''
	});
}
var GLoad;
(function() {
	var jslinker = {
		version : "182",
		jsbinary : [{
			id : "maps2",
			url : "http://maps.gstatic.cn/intl/zh-CN_cn/mapfiles/225b/maps2/main.js"
		}, {
			id : "maps2.api",
			url : "http://maps.gstatic.cn/intl/zh-CN_cn/mapfiles/225b/maps2.api/main.js"
		}, {
			id : "gc",
			url : "http://maps.gstatic.cn/intl/zh-CN_cn/mapfiles/225b/gc.js"
		}, {
			id : "suggest",
			url : "http://maps.gstatic.cn/intl/zh-CN_cn/mapfiles/225b/suggest/main.js"
		}, {
			id : "pphov",
			url : "http://maps.gstatic.cn/intl/zh-CN_cn/mapfiles/225b/pphov.js"
		}]
	};
	GLoad = function(callback) {
		var callee = arguments.callee;
		var apiCallback = callback;
		GApiInit();
		var opts = {
			public_api : true,
			zoom_override : [{
						country : "cn",
						maptype : 1,
						override : [{
									rect : {
										lo : {
											lat_e7 : 269808286,
											lng_e7 : 735644531
										},
										hi : {
											lat_e7 : 536185794,
											lng_e7 : 1234423828
										}
									},
									max_zoom : 18
								}, {
									rect : {
										lo : {
											lat_e7 : 398085360,
											lng_e7 : 1234424000
										},
										hi : {
											lat_e7 : 536186000,
											lng_e7 : 1347363281
										}
									},
									max_zoom : 18
								}, {
									rect : {
										lo : {
											lat_e7 : 183128000,
											lng_e7 : 976465000
										},
										hi : {
											lat_e7 : 270591000,
											lng_e7 : 1199487000
										}
									},
									max_zoom : 18
								}]
					}, {
						country : "cn",
						maptype : 2,
						override : [{
									rect : {
										lo : {
											lat_e7 : 269808286,
											lng_e7 : 735644531
										},
										hi : {
											lat_e7 : 536185794,
											lng_e7 : 1234423828
										}
									},
									max_zoom : 18
								}, {
									rect : {
										lo : {
											lat_e7 : 398085360,
											lng_e7 : 1234424000
										},
										hi : {
											lat_e7 : 536186000,
											lng_e7 : 1347363281
										}
									},
									max_zoom : 18
								}, {
									rect : {
										lo : {
											lat_e7 : 183128000,
											lng_e7 : 976465000
										},
										hi : {
											lat_e7 : 270591000,
											lng_e7 : 1199487000
										}
									},
									max_zoom : 18
								}]
					}],
			export_legacy_names : true,
			tile_override : [{
				maptype : 0,
				min_zoom : 7,
				max_zoom : 7,
				rect : [{
							lo : {
								lat_e7 : 330000000,
								lng_e7 : 1246050000
							},
							hi : {
								lat_e7 : 386200000,
								lng_e7 : 1293600000
							}
						}, {
							lo : {
								lat_e7 : 366500000,
								lng_e7 : 1297000000
							},
							hi : {
								lat_e7 : 386200000,
								lng_e7 : 1320034790
							}
						}],
				uris : [
						"http://mt0.gmaptiles.co.kr/mt/v=kr1.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt1.gmaptiles.co.kr/mt/v=kr1.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt2.gmaptiles.co.kr/mt/v=kr1.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt3.gmaptiles.co.kr/mt/v=kr1.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26"]
			}, {
				maptype : 0,
				min_zoom : 8,
				max_zoom : 9,
				rect : [{
							lo : {
								lat_e7 : 330000000,
								lng_e7 : 1246050000
							},
							hi : {
								lat_e7 : 386200000,
								lng_e7 : 1279600000
							}
						}, {
							lo : {
								lat_e7 : 345000000,
								lng_e7 : 1279600000
							},
							hi : {
								lat_e7 : 386200000,
								lng_e7 : 1286700000
							}
						}, {
							lo : {
								lat_e7 : 348900000,
								lng_e7 : 1286700000
							},
							hi : {
								lat_e7 : 386200000,
								lng_e7 : 1293600000
							}
						}, {
							lo : {
								lat_e7 : 354690000,
								lng_e7 : 1293600000
							},
							hi : {
								lat_e7 : 386200000,
								lng_e7 : 1320034790
							}
						}],
				uris : [
						"http://mt0.gmaptiles.co.kr/mt/v=kr1.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt1.gmaptiles.co.kr/mt/v=kr1.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt2.gmaptiles.co.kr/mt/v=kr1.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt3.gmaptiles.co.kr/mt/v=kr1.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26"]
			}, {
				maptype : 0,
				min_zoom : 10,
				max_zoom : 19,
				rect : [{
							lo : {
								lat_e7 : 329890840,
								lng_e7 : 1246055600
							},
							hi : {
								lat_e7 : 386930130,
								lng_e7 : 1284960940
							}
						}, {
							lo : {
								lat_e7 : 344646740,
								lng_e7 : 1284960940
							},
							hi : {
								lat_e7 : 386930130,
								lng_e7 : 1288476560
							}
						}, {
							lo : {
								lat_e7 : 350277470,
								lng_e7 : 1288476560
							},
							hi : {
								lat_e7 : 386930130,
								lng_e7 : 1310531620
							}
						}, {
							lo : {
								lat_e7 : 370277730,
								lng_e7 : 1310531620
							},
							hi : {
								lat_e7 : 386930130,
								lng_e7 : 1320034790
							}
						}],
				uris : [
						"http://mt0.gmaptiles.co.kr/mt/v=kr1.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt1.gmaptiles.co.kr/mt/v=kr1.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt2.gmaptiles.co.kr/mt/v=kr1.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt3.gmaptiles.co.kr/mt/v=kr1.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26"]
			}, {
				maptype : 3,
				min_zoom : 7,
				max_zoom : 7,
				rect : [{
							lo : {
								lat_e7 : 330000000,
								lng_e7 : 1246050000
							},
							hi : {
								lat_e7 : 386200000,
								lng_e7 : 1293600000
							}
						}, {
							lo : {
								lat_e7 : 366500000,
								lng_e7 : 1297000000
							},
							hi : {
								lat_e7 : 386200000,
								lng_e7 : 1320034790
							}
						}],
				uris : [
						"http://mt0.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt1.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt2.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt3.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26"]
			}, {
				maptype : 3,
				min_zoom : 8,
				max_zoom : 9,
				rect : [{
							lo : {
								lat_e7 : 330000000,
								lng_e7 : 1246050000
							},
							hi : {
								lat_e7 : 386200000,
								lng_e7 : 1279600000
							}
						}, {
							lo : {
								lat_e7 : 345000000,
								lng_e7 : 1279600000
							},
							hi : {
								lat_e7 : 386200000,
								lng_e7 : 1286700000
							}
						}, {
							lo : {
								lat_e7 : 348900000,
								lng_e7 : 1286700000
							},
							hi : {
								lat_e7 : 386200000,
								lng_e7 : 1293600000
							}
						}, {
							lo : {
								lat_e7 : 354690000,
								lng_e7 : 1293600000
							},
							hi : {
								lat_e7 : 386200000,
								lng_e7 : 1320034790
							}
						}],
				uris : [
						"http://mt0.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt1.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt2.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt3.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26"]
			}, {
				maptype : 3,
				min_zoom : 10,
				rect : [{
							lo : {
								lat_e7 : 329890840,
								lng_e7 : 1246055600
							},
							hi : {
								lat_e7 : 386930130,
								lng_e7 : 1284960940
							}
						}, {
							lo : {
								lat_e7 : 344646740,
								lng_e7 : 1284960940
							},
							hi : {
								lat_e7 : 386930130,
								lng_e7 : 1288476560
							}
						}, {
							lo : {
								lat_e7 : 350277470,
								lng_e7 : 1288476560
							},
							hi : {
								lat_e7 : 386930130,
								lng_e7 : 1310531620
							}
						}, {
							lo : {
								lat_e7 : 370277730,
								lng_e7 : 1310531620
							},
							hi : {
								lat_e7 : 386930130,
								lng_e7 : 1320034790
							}
						}],
				uris : [
						"http://mt0.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt1.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt2.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt3.gmaptiles.co.kr/mt/v=kr1p.12\x26hl=zh-CN\x26gl=cn\x26src=api\x26"]
			}, {
				country : "cn",
				maptype : 0,
				uris : [
						"http://mt0.google.cn/vt/lyrs=m@124\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt1.google.cn/vt/lyrs=m@124\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt2.google.cn/vt/lyrs=m@124\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt3.google.cn/vt/lyrs=m@124\x26hl=zh-CN\x26gl=cn\x26src=api\x26"]
			}, {
				country : "cn",
				maptype : 2,
				uris : [
						"http://mt0.google.cn/vt/imgtp=png32\x26lyrs=h@124\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt1.google.cn/vt/imgtp=png32\x26lyrs=h@124\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt2.google.cn/vt/imgtp=png32\x26lyrs=h@124\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt3.google.cn/vt/imgtp=png32\x26lyrs=h@124\x26hl=zh-CN\x26gl=cn\x26src=api\x26"]
			}, {
				country : "cn",
				maptype : 3,
				uris : [
						"http://mt0.google.cn/vt/lyrs=t@108,r@124\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt1.google.cn/vt/lyrs=t@108,r@124\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt2.google.cn/vt/lyrs=t@108,r@124\x26hl=zh-CN\x26gl=cn\x26src=api\x26",
						"http://mt3.google.cn/vt/lyrs=t@108,r@124\x26hl=zh-CN\x26gl=cn\x26src=api\x26"]
			}],
			jsmain : "http://maps.gstatic.cn/intl/zh-CN_cn/mapfiles/225b/maps2.api/main.js",
			bcp47_language_code : "zh-Hans-CN",
			gaia_redirect_host : "ditu.google.com",
			log_info_window_ratio : 0.0099999997764825821,
			log_fragment_count : 10,
			log_fragment_seed : 4,
			obliques_urls : ["http://khmdb0.google.com/kh?v=26\x26",
					"http://khmdb1.google.com/kh?v=26\x26"],
			token : 1517509430,
			jsmodule_base_url : "http://maps.gstatic.cn/intl/zh-CN_cn/mapfiles/225b/maps2.api",
			transit_allowed : false,
			generic_tile_urls : [
					"http://mt0.google.com/vt?hl=zh-CN\x26gl=cn\x26src=api\x26",
					"http://mt1.google.com/vt?hl=zh-CN\x26gl=cn\x26src=api\x26"]
		};
		var pageArgs = {};
		apiCallback(
				[
						"http://mt0.google.com/vt/lyrs\x3dm@124\x26hl\x3dzh-CN\x26gl\x3dcn\x26src\x3dapi\x26",
						"http://mt1.google.com/vt/lyrs\x3dm@124\x26hl\x3dzh-CN\x26gl\x3dcn\x26src\x3dapi\x26"],
				["http://mt0.google.cn/vt/lyrs\x3ds@59\x26gl\x3dcn\x26",
						"http://mt1.google.cn/vt/lyrs\x3ds@59\x26gl\x3dcn\x26",
						"http://mt2.google.cn/vt/lyrs\x3ds@59\x26gl\x3dcn\x26",
						"http://mt3.google.cn/vt/lyrs\x3ds@59\x26gl\x3dcn\x26"],
				[
						"http://mt0.google.com/vt/lyrs\x3dh@124\x26hl\x3dzh-CN\x26gl\x3dcn\x26src\x3dapi\x26",
						"http://mt1.google.com/vt/lyrs\x3dh@124\x26hl\x3dzh-CN\x26gl\x3dcn\x26src\x3dapi\x26"],
				"",
				"",
				"",
				true,
				"google.maps.",
				opts,
				[
						"http://mt0.google.com/vt/lyrs\x3dt@108,r@124\x26hl\x3dzh-CN\x26gl\x3dcn\x26src\x3dapi\x26",
						"http://mt1.google.com/vt/lyrs\x3dt@108,r@124\x26hl\x3dzh-CN\x26gl\x3dcn\x26src\x3dapi\x26"],
				jslinker, pageArgs);
		if (!callee.called) {
			callee.called = true;
		}
	}
})();
function GUnload() {
	if (window.GUnloadApi) {
		GUnloadApi();
	}
}
var _mIsRtl = false;
var _mF = [
		,
		,
		,
		,
		,
		20,
		4096,
		"bounds_cippppt.txt",
		"cities_cippppt.txt",
		"local/add/flagStreetView",
		true,
		,
		400,
		,
		,
		,
		,
		,
		,
		"/maps/c/ui/HovercardLauncher/dommanifest.js",
		,
		,
		,
		false,
		false,
		,
		,
		,
		,
		,
		true,
		,
		,
		,
		,
		,
		,
		,
		"http://maps.google.com/maps/stk/fetch",
		0,
		,
		true,
		,
		,
		,
		true,
		,
		,
		,
		"http://maps.google.com/maps/stk/style",
		,
		"107485602240773805043.00043dadc95ca3874f1fa",
		,
		,
		false,
		1000,
		,
		"http://cbk0.google.com",
		false,
		,
		"ar,iw",
		,
		,
		,
		,
		,
		,
		,
		,
		"http://pagead2.googlesyndication.com/pagead/imgad?id\x3dCMKp3NaV5_mE1AEQEBgQMgieroCd6vHEKA",
		,
		,
		false,
		false,
		,
		false,
		,
		,
		,
		,
		"SS",
		"en,fr,ja",
		,
		,
		,
		,
		,
		,
		true,
		,
		,
		,
		,
		,
		true,
		,
		,
		,
		,
		"",
		"1",
		,
		false,
		false,
		,
		false,
		,
		,
		,
		"AU,BE,FR,NZ,US",
		,
		,
		false,
		true,
		500,
		"http://chart.apis.google.com/chart?cht\x3dqr\x26chs\x3d80x80\x26chld\x3d|0\x26chl\x3d",
		,
		,
		,
		true,
		,
		,
		,
		,
		false,
		,
		,
		false,
		false,
		true,
		,
		,
		true,
		,
		,
		,
		,
		,
		,
		,
		10,
		,
		true,
		true,
		,
		,
		,
		30,
		"infowindow_v1",
		"",
		false,
		false,
		22,
		'http://khm.google.cn/vt/lbw/lyrs\x3dm\x26hl\x3dzh-CN\x26gl\x3dcn\x26',
		'http://khm.google.cn/vt/lbw/lyrs\x3ds\x26hl\x3dzh-CN\x26gl\x3dcn\x26',
		'http://khm.google.cn/vt/lbw/lyrs\x3dy\x26hl\x3dzh-CN\x26gl\x3dcn\x26',
		'http://khm.google.cn/vt/lbw/lyrs\x3dp\x26hl\x3dzh-CN\x26gl\x3dcn\x26',
		,
		,
		false,
		"US,AU,NZ,FR,DK,MX,BE,CA,DE,GB,IE,PR,PT,RU,SG,JM,HK,TW,MY,TH,AT,CZ,CN,IN,KR",
		,
		,
		"windows-ie,windows-firefox,windows-chrome,macos-safari,macos-firefox,macos-chrome",
		true,
		false,
		20000,
		600,
		30,
		,
		,
		,
		,
		,
		false,
		true,
		,
		,
		"maps.google.com",
		,
		,
		,
		,
		"",
		true,
		,
		,
		,
		true,
		"4:http://gt%1$d.google.com/mt?v\x3dgwm.fresh\x26",
		"4:http://gt%1$d.google.com/mt?v\x3dgwh.fresh\x26",
		true,
		false,
		,
		,
		0.25,
		,
		"107485602240773805043.0004561b22ebdc3750300",
		,
		,
		,
		,
		false,
		,
		,
		true,
		,
		8,
		,
		,
		,
		,
		false,
		"https://cbks0.google.com",
		,
		true,
		,
		,
		,
		,
		,
		false,
		,
		,
		,
		,
		,
		,
		,
		true,
		,
		,
		true,
		true,
		false,
		,
		,
		,
		true,
		"http://mt0.google.com/vt/ft",
		false,
		,
		"http://chart.apis.google.com/chart",
		,
		,
		,
		,
		,
		,
		'0.25',
		false,
		,
		,
		,
		,
		false,
		,
		2,
		160,
		,
		,
		true,
		true,
		false,
		,
		,
		,
		false,
		,
		,
		45,
		true,
		,
		false,
		true,
		true,
		,
		,
		,
		false,
		false,
		false,
		,
		false,
		false,
		,
		false,
		,
		false,
		false,
		true,
		true,
		,
		,
		false,
		,
		,
		,
		,
		true,
		,
		"DE,CH,LI,AT,BE,PL,NL,HU,GR,HR,CZ,SK,TR,BR,EE,ES,AD,SE,NO,DK,FI,IT,VA,SM,IL,CL,MX,AR,BG,PT",
		false,
		,
		"25",
		true,
		25,
		"Home for sale",
		,
		false,
		true,
		true,
		false,
		,
		false,
		"4:https://gt%1$d.google.com/mt?v\x3dgwm.fresh\x26",
		"4:https://gt%1$d.google.com/mt?v\x3dgwh.fresh\x26",
		,
		,
		,
		,
		"",
		,
		,
		false,
		true,
		true,
		,
		,
		false,
		"1.x",
		false,
		false,
		false,
		,
		true,
		3000,
		false,
		true,
		,
		"US",
		,
		,
		false,
		,
		false,
		true,
		,
		24,
		6,
		2,
		,
		,
		0,
		false,
		,
		,
		false,
		true,
		false,
		false,
		true,
		false,
		,
		false,
		true,
		,
		false,
		false,
		"/maps/c",
		true,
		100,
		1000,
		100,
		50,
		2,
		true,
		true,
		false,
		false,
		,
		false,
		false,
		false,
		false,
		false,
		5,
		5,
		true,
		"windows-firefox,windows-ie,windows-chrome,macos-firefox,macos-safari,macos-chrome",
		true, false];
var _mHost = "http://ditu.google.cn";
var _mUri = "/maps";
var _mDomain = "google.cn";
var _mStaticPath = "http://maps.gstatic.cn/intl/zh-CN_cn/mapfiles/";
var _mRelativeStaticPath = "/intl/zh-CN_cn/mapfiles/";
var _mJavascriptVersion = G_API_VERSION = "225b";
var _mTermsUrl = "http://www.google.com/intl/zh-CN_cn/help/terms_maps.html";
var _mLocalSearchUrl = "http://www.google.com/uds/solutions/localsearch/gmlocalsearch.js";
var _mUrlLanguageParameter = "zh-CN";
var _mHL = "zh-CN";
var _mGL = "cn";
var _mTrafficEnableApi = true;
var _mTrafficTileServerUrls = ["http://mt0.google.com/mapstt",
		"http://mt1.google.com/mapstt", "http://mt2.google.com/mapstt",
		"http://mt3.google.com/mapstt"];
var _mTrafficCameraLayerIds = [
		"msid:103669521412303283270.000470c7965f9af525967",
		"msid:111496436295867409379.00047329600bf6daab897"];
var _mCityblockLatestFlashUrl = "http://ditu.google.cn/local_url?q=http://www.adobe.com/shockwave/download/download.cgi%3FP1_Prod_Version%3DShockwaveFlash&amp;dq=&amp;file=api&amp;hl=zh-CN&amp;s=ANYYN7n5bBCaNOa4tQml1oYp1xEztORwdw";
var _mCityblockFrogLogUsage = false;
var _mCityblockInfowindowLogUsage = true;
var _mCityblockDrivingDirectionsLogUsage = true;
var _mCityblockPrintwindowLogUsage = true;
var _mCityblockPrintwindowImpressionLogUsage = false;
var _mCityblockUseSsl = false;
var _mWizActions = {
	hyphenSep : 1,
	breakSep : 2,
	dir : 3,
	searchNear : 6,
	savePlace : 9
};
var _mIGoogleUseXSS = false;
var _mIGoogleEt = "4bd80f4fgpXnk3Qj";
var _mIGoogleServerTrustedUrl = "";
var _mMMEnablePanelTab = true;
var _mIdcRouterPath = true;
var _mIGoogleServerUntrustedUrl = "http://maps.gmodules.com";
var _mMplGGeoXml = 100;
var _mMplGPoly = 100;
var _mMplMapViews = 100;
var _mMplGeocoding = 100;
var _mMplDirections = 100;
var _mMplEnableGoogleLinks = false;
var _mMMEnableAddContent = false;
var _mMSEnablePublicView = false;
var _mMSSurveyUrl = "";
var _mMMLogPanelLoad = true;
var _mSatelliteToken = "fzwq1Kj7NY7KJgHA3nRzDk_-6WoFfjWrb22r5A";
var _mMapCopy = "地图数据 \x26#169;2010";
var _mSatelliteCopy = "Imagery \x26#169;2010";
var _mGoogleCopy = "\x26#169;2010 Google";
var _mPreferMetric = true;
var _mMapPrintUrl = 'http://www.google.com/mapprint';
var _mSvgForced = true;
var _mLogPanZoomClks = false;
var _mLyrcItems = [];
var _mMSMarker = '定位标记';
var _mMSLine = '线条';
var _mMSPolygon = '图形';
var _mMSImage = '图片';
var _mDirectionsDragging = true;
var _mDirectionsEnableCityblock = true;
var _mDirectionsEnableApi = true;
var _mAdSenseForMapsEnable = "true";
var _mAdSenseForMapsFeedUrl = "http://pagead2.googlesyndication.com/afmaps/ads";
var _mLayersTileBaseUrls = ['http://mt0.google.com/mapslt',
		'http://mt1.google.com/mapslt', 'http://mt2.google.com/mapslt',
		'http://mt3.google.com/mapslt'];
var _mLayersFeaturesBaseUrl = "http://mt0.google.com/mapslt/ft";
var _mPerTileBase = "http://mt0.google.com/vt/pt";
function GLoadMapsScript() {
	if (!GLoadMapsScript.called && GBrowserIsCompatible()) {
		GLoadMapsScript.called = true;
		GScript("http://maps.gstatic.cn/intl/zh-CN_cn/mapfiles/225b/maps2.api/main.js");
	}
}
(function() {
	if (!window.google)
		window.google = {};
	if (!window.google.maps)
		window.google.maps = {};
	var ns = window.google.maps;
	ns.BrowserIsCompatible = GBrowserIsCompatible;
	ns.Unload = GUnload;
})();
GLoadMapsScript();