package com.cce.weaponry.web.vo.trace;

import java.util.ArrayList;
import java.util.List;

import com.cce.modules.orm.IdEntity;

public class CompanyTypeVO extends IdEntity {

	private Long typeId;

	private String typeName;

	private static List<CompanyTypeVO> typeList = new ArrayList<CompanyTypeVO>();

	public static List<CompanyTypeVO> getTypeList() {
		if (typeList.size() == 0) {
			// 动检、活猪进厂、屠宰、商检、出厂、销售
			CompanyTypeVO type0 = new CompanyTypeVO(0l, "全部");
			CompanyTypeVO type1 = new CompanyTypeVO(1l, "动检");
			CompanyTypeVO type2 = new CompanyTypeVO(2l, "活猪进场");
			CompanyTypeVO type3 = new CompanyTypeVO(3l, "屠宰");
			CompanyTypeVO type4 = new CompanyTypeVO(4l, "商检");
			CompanyTypeVO type5 = new CompanyTypeVO(5l, "出厂");
			CompanyTypeVO type6 = new CompanyTypeVO(6l, "销售");

			typeList.add(type0);
			typeList.add(type1);
			typeList.add(type2);
			typeList.add(type3);
			typeList.add(type4);
			typeList.add(type5);
			typeList.add(type6);
		}
		return typeList;
	}


	public static CompanyTypeVO getTypeById(Long id) {
		if (null == id || 0l == id)
			return null;
		else {
			for (CompanyTypeVO i : typeList) {
				if (id == i.getId())
					return i;
			}
		}
		return null;
	}

	public Long getTypeId() {
		return typeId;
	}

	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}



	public CompanyTypeVO(Long typeId, String typeName) {
		this.typeId = typeId;
		this.typeName = typeName;
	}

}
