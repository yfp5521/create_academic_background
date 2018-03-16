# 学歴変換js（履歴書用）
生年月日を渡すと、学歴を返すjsです。
履歴書を書く際に必要な学歴の項目（年、月、説明）を返します。
和暦変換対応です。

#### ・デモ１  
https://codepen.io/yfp5521/full/NYrzdP/

#### ・デモ２  
https://codepen.io/yfp5521/full/LdZBxK/

## 使い方
create_academic_background(birth,options)を呼び出すと、戻り値をリストで返します。（デフォルトでは中学、高校、大学の学歴を返します）
birthは生年月日、optionsは留年や浪人などのオプションを指定します。

#### 使用例
```
    //生年月日オブジェクトを作成
    let birth = new Object();
    birth.year = 1990;
    birth.month = 1;
    birth.day = 10;
    
    //学歴変換jsを呼び出し、戻り値をresult_listに格納
    const result_list = create_academic_background(birth) 


    //以下result_listの中身
    [    
        {
            desc: "◯◯中学校　卒業",
            japanese_year: "平成17年",
            month: 3,
            western_year: 2005
        },
        {
            desc: "◯◯高等学校　入学",
            japanese_year: "平成17年",
            month: 4,
            western_year : 2005
        },
        {
            desc: "◯◯高等学校　卒業",
            japanese_year: "平成20年",
            month: 3,
            western_year: 2008
        },
          {
            desc: "◯◯大学　◯◯学部　◯◯学科　入学",
            japanese_year: "平成20年",
            month: 4,
            western_year : 2008
        },
        {
            desc: "◯◯大学　◯◯学部　◯◯学科　卒業",
            japanese_year: "平成24年",
            month: 3,
            western_year: 2012
        },
    ]
    
```


 




## 引数の詳細

引数は生年月日とオプション（浪人、留年などの設定）の２つです。  

    function create_academic_background(birth, options)


### 生年月日(birth) ※必須
+   `bitrh.birth_year` : 
    生年月日の「年」を西暦４桁で渡します。（例：1990）

+   `bitrh.birth_month`:
    生年月日の「月」を渡します。（例：1）

+   `bitrh.birth_year` :
    生年月日の「日」を渡します。（例：10）


### オプション(options)　※任意

オプションでは留年・浪人などの期間や表示の可否を設定できます。


#### optionsオブジェクトの構成(抜粋)
```
	{
		//大学入学
		before_university: {
			month: 4, //入学月
			desc: '◯◯大学　◯◯学部　◯◯学科',　//入学した大学の説明
			select: true, //戻り値の学歴リストに追加するか否か
			period: 0　//入学前の年数（浪人の年数）
		},
		//大学卒業
		university: {
			month: 3,　//卒業月
			desc: '◯◯大学　◯◯学部　◯◯学科　卒業',　//入学した大学の説明
			select: true,　//戻り値の学歴リストに追加するか否か
			period: 4　//在籍年数
		},
	}
```


#### デフォルトの設定
デフォルトでは以下の通りに設定されているので、必要な箇所を上書きしてください。  
デフォルトでは中高大の学歴が、戻り値に追加されるようになっています。

```
	{
		//中学卒業
		junior: {
			month: 3,
			desc: '◯◯中学校　卒業',
			select: true,
			period: 3
		},
		//高校入学
		before_highschool: {
			month: 4,
			desc: '◯◯高等学校',
			select: true,
			period: 0
		},
		//高校卒業
		highschool: {
			month: 3,
			desc: '◯◯高等学校　卒業',
			select: true,
			period: 3
		},
		//専門学校入学
		before_special_school: {
			month: 4,
			desc: '◯◯専門学校　◯◯科',
			select: false,
			period: 0
		},
		//専門学校卒業
		special_school: {
			month: 3,
			desc: '◯◯専門学校　◯◯科　卒業',
			select: false,
			period: 1
		},
		//短大入学
		before_junior_college: {
			month: 4,
			desc: '◯◯短期大学　◯◯学部　◯◯学科',
			select: false,
			period: 0
		},
		//短大卒業
		junior_college: {
			month: 3,
			desc: '◯◯短期大学　◯◯学部　◯◯学科　卒業',
			select: false,
			period: 3
		},
		//大学入学
		before_university: {
			month: 4,
			desc: '◯◯大学　◯◯学部　◯◯学科',
			select: true,
			period: 0
		},
		//大学卒業
		university: {
			month: 3,
			desc: '◯◯大学　◯◯学部　◯◯学科　卒業',
			select: true,
			period: 4
		},
		//大学院（修士）入学
		before_master: {
			month: 4,
			desc: '◯◯大学 大学院　◯◯学研究科　◯◯学専攻　修士課程',
			select: false,
			period: 0
		},
		//大学院（修士）修了
		master: {
			month: 3,
			desc: '◯◯大学 大学院　◯◯学研究科　◯◯学専攻　修士課程　修了',
			select: false,
			period: 2
		},
		//大学院（博士）入学
		before_doctor: {
			month: 4,
			desc: '◯◯大学 大学院　◯◯学研究科　◯◯学専攻　博士課程',
			select: false,
			period: 0
		},
		//大学院（博士）修了
		doctor: {
			month: 3,
			desc: '◯◯大学 大学院　◯◯学研究科　◯◯学専攻　博士課程　修了',
			select: false,
			period: 3
		},
	};
```
##### オプションの追加例１（大学浪人２年、大学留年１年を追加）
```
    let birth = new Object();
    birth.year = 1990;
    birth.month = 1;
    birth.day = 10;
    
    let options = new Object();
    options ={
        //大学入学
        before_university: {
            period: 2　//浪人期間
        },
        //大学卒業
        university: {
            period: 5 //在籍期間（４年+ 留年１年）
        },
    }

    const result = create_academic_background(birth, options)  
    //resultには中高大の学歴が入っている

```

##### オプションの追加例２（修士を追加）
```
    let birth = new Object();
    birth.year = 1990;
    birth.month = 1;
    birth.day = 10;
    
    let options = new Object();
    options ={
        master: {
            select: true, //大学院（修士）の追加をtrueにする
        },
    }

    const result = create_academic_background(birth, options)　//resultには中高大、修士の学歴が入っている

```

## 最終学歴の設定
上記のようにデフォルト値を上書きする方法以外に、最終学歴(last_academic_background)を渡すことで戻り値の学歴リストを指定することもできます。
(留年や浪人などを追加するperiodも併用できます。)

##### 例
```
    options.last_academic_background　= 'highschool' 「中学、高校」の学歴を戻り値として返す
    
    options.last_academic_background　= 'junior_college' 「中学、高校、短大」の学歴を戻り値として返す　　
```

##### 指定できる値
+   'junior'　: 「中学」のみ表示
+   'highschool'　: 「中学、高校」を表示
+   'special_school'　: 「中学、高校、専門学校」を表示
+   'junior_college'　: 「中学、高校、短大」を表示
+   'university'　: 「中学、高校、大学」を表示
+   'master'　: 「中学、高校、大学、修士」を表示
+   'doctor': 「中学、高校、大学、修士、博士」を表示
  
  
## License
MIT


