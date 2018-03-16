function create_academic_background(birth, options) {
	//生年月日を取得
	const birth_year = birth.year,
		birth_month = birth.month,
		birth_day = birth.day;

	//中学入学年度を計算（早生まれは１年遅れる)
	const start_year = function () {
		if (birth_month < 4 || (birth_month == 4 && birth_day == 1)) {
			return birth_year + 12;
		}
		else {
			return birth_year + 13;
		}
	};

	//デフォルトの学歴（中高大をデフォルト表示）
	const default_academic_background = {
		junior: {
			month: 3,
			desc: '◯◯中学校　卒業',
			select: true,
			period: 3
		},
		before_highschool: {
			month: 4,
			desc: '◯◯高等学校',
			select: true,
			period: 0
		},
		highschool: {
			month: 3,
			desc: '◯◯高等学校　卒業',
			select: true,
			period: 3
		},
		before_special_school: {
			month: 4,
			desc: '◯◯専門学校　◯◯科',
			select: false,
			period: 0
		},
		special_school: {
			month: 3,
			desc: '◯◯専門学校　◯◯科　卒業',
			select: false,
			period: 1
		},
		before_junior_college: {
			month: 4,
			desc: '◯◯短期大学　◯◯学部　◯◯学科',
			select: false,
			period: 0
		},
		junior_college: {
			month: 3,
			desc: '◯◯短期大学　◯◯学部　◯◯学科　卒業',
			select: false,
			period: 3
		},
		before_university: {
			month: 4,
			desc: '◯◯大学　◯◯学部　◯◯学科',
			select: true,
			period: 0
		},
		university: {
			month: 3,
			desc: '◯◯大学　◯◯学部　◯◯学科　卒業',
			select: true,
			period: 4
		},
		before_master: {
			month: 4,
			desc: '◯◯大学 大学院　◯◯学研究科　◯◯学専攻　修士課程',
			select: false,
			period: 0
		},
		master: {
			month: 3,
			desc: '◯◯大学 大学院　◯◯学研究科　◯◯学専攻　修士課程　修了',
			select: false,
			period: 2
		},
		before_doctor: {
			month: 4,
			desc: '◯◯大学 大学院　◯◯学研究科　◯◯学専攻　博士課程',
			select: false,
			period: 0
		},
		doctor: {
			month: 3,
			desc: '◯◯大学 大学院　◯◯学研究科　◯◯学専攻　博士課程　修了',
			select: false,
			period: 3
		}
	};

	//デフォルトの学歴にoptionsを上書き
	let academic_background = default_academic_background;
	for (let i in academic_background) {
		for (let j in options) {
			if (i == j) {
				academic_background[i] = Object.assign(academic_background[i], options[j]);
			}
		}
	}

	//最終学歴が指定された場合
	if (options.last_academic_background) {
		academic_background = get_academic_background_from_last(academic_background, options.last_academic_background);
	}

	//戻り値のリストを作成
	let result = [];
	let year = start_year();
	for (let i in academic_background) {
		let item = academic_background[i];
		if (item.select) {
			year += item.period;
			//入学の場合
			if (i.indexOf('before') > -1) {
				result.push(
					{
						japanese_year: get_japanese_year(year, item.month, 1),
						western_year: year,
						month: item.month,
						desc: item.desc + '　入学'
					}
				);
			}
			//卒業の場合
			else {
				result.push(
					{
						japanese_year: get_japanese_year(year, item.month, 31),
						western_year: year,
						month: item.month,
						desc: item.desc
					}
				);
			}
		}
	}
	return result;
}


//最終学歴をもとに学歴を取得する関数
function get_academic_background_from_last(academic_background, last_academic_background) {

	//デフォルトの高校、大学の学歴をfalseにする
	academic_background['before_highschool'].select = false;
	academic_background['highschool'].select = false;
	academic_background['before_university'].select = false;
	academic_background['university'].select = false;

	//最終学歴に対応するオブジェクトを作成
	const academic_obj_list = {
		highschool: ['highschool'],
		special_school: ['highschool', 'special_school'],
		junior_college: ['highschool', 'junior_college'],
		university: ['highschool', 'university'],
		master: ['highschool', 'university', 'master'],
		doctor: ['highschool', 'university', 'master', 'doctor']
	};

	for (let list in academic_obj_list) {
		//最終学歴と一致した場合
		if (list == last_academic_background) {
			const item = academic_obj_list[list];
			//オブジェクト内のリストをループ
			for (let i = 0; i < item.length; i++) {
				//リスト内の学歴の表示をtrueにする
				academic_background['before_' + item[i]].select = true;
				academic_background[item[i]].select = true;
			}
		}
	}
	return academic_background;
}

//和暦変換の関数
function get_japanese_year(year, month, day) {
	const western_date = new Date(year, month - 1, day, 0, 0, 0);
	const gengo_list = [
		{
			name: '', //明治以前は西暦表示
			end_date: new Date('1868/1/24 23:59:59'),
			base_year: 0
		},
		{
			name: '明治',
			end_date: new Date('1912/7/29 23:59:59'),
			base_year: 1867
		},
		{
			name: '大正',
			end_date: new Date('1926/12/24 23:59:59'),
			base_year: 1911
		},
		{
			name: '昭和',
			end_date: new Date('1989/1/7 23:59:59'),
			base_year: 1925
		},
		{
			name: '平成',
			end_date: new Date('2019/4/30 23:59:59'),
			base_year: 1988
		},
		{
			name: '[新元号]',//新元号が発表されたらここを変える。[]は不要。
			end_date: new Date('9999/12/31 23:59:59'),
			base_year: 2018
		}
	];


	for (let i = 0; i < gengo_list.length; i++) {
		if (western_date.getTime() < gengo_list[i].end_date.getTime()) {
			const japanese_year = year - gengo_list[i].base_year;
			//元年の場合
			if (japanese_year == 1) {
				return gengo_list[i].name + '元年';
			}
			//元年以外の場合
			return gengo_list[i].name + japanese_year + '年';
		}
	}
	return year;
}