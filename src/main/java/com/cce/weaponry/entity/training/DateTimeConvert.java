package com.cce.weaponry.entity.training;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateTimeConvert {

	public static String toString(Date dt) {
		SimpleDateFormat formatter;

		formatter = new SimpleDateFormat("yyyy-MM-dd kk:mm:ss");
		return formatter.format(dt);
	}
}
