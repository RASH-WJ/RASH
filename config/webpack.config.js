const path=require("path");
const HtmlWebpackPlugin=require('html-webpack-plugin');//引入插件
const miniCssExtractPlugin=require('mini-css-extract-plugin');
module.exports={
	//文件输入
	mode:"production",//development
	entry:{
	index:"./src/index.js",
	main:"./src/main.js"
		
	},
	//文件输出
	output:{
		path:path.resolve(__dirname,"../dist/"),//打包完成输出的文件路径
		// filename:"index.js"//输出文件名称
		// filename:"[name].[hash].js"//输出文件名称
		filename:"[name].js"//输出文件名称
	},
	devServer:{
		contentBase:path.join(__dirname,"../dist/"),
		compress:true,
		port:8080,
		open:true
	},
	
	module:{
		// css解析规则
		rules:[
			{
				test:/\.css$/,//文件解析匹配规则,正则规则
				use:[//表示匹配到的文件需要用那些loader处理
				
					// {loader:"style-loader"},
					{loader:miniCssExtractPlugin.loader},
					{loader:"css-loader"}
				]
			},
			{
				//匹配less文件
				test:/\.less$/,//匹配less结尾的文件
				use:[
					{loader:miniCssExtractPlugin.loader},
					{loader:"css-loader"},
					{loader:"less-loader"}
				]
			},
			/* {
				//匹配图片文件
				test:/\.(jpg|png|gif|webp|jpeg)$/,
				use:[
					{loader:"file-loader"}
				]
			}, */
			{
				//匹配base64
				test:/\.(jpg|png|gif|webp|jepg)$/,
				use:[
					{
						loader:"url-loader",
						options:{
							limit:102400  //单位byte
						}
					}
				]
			},
			{
				//匹配js
				test:/\.js$/,
				exclude:/(node_modules|brower_components)/,//转换的时候排查相关js文件
				use:[
					{
						loader:"babel-loader",
						options:{//选项参数
							presets:["env"]//预设es6转换es5
						}
					}
				]
			},
			{
			//匹配sass
				test:/\.s[ac]ss$/i,
				use:[
					{loader:"style-loader"},
					{loader:"css-loader"},
					{loader:"sass-loader"}
				]
			}
			
		]
	},
	plugins:[
		new HtmlWebpackPlugin({//构造函数传参
			title:"dsad",
			template:"./src/tpl.html",//模板路径
			inject:"body",
			minify:{
				removeComments:true,//是否移出注释
				removeAttributeQuotes:true,//是否移出属性的引号
				collapseWhitespace:true//是否移出空白
			},
			filename:"index.html"
		}),
		new miniCssExtractPlugin({//初始化css插件
			filename:"[name].css"
		})
	]
}