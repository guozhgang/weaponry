package com.cce.weaponry.entity.register;

import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("Technician")
public class TechnicianBadge extends UserBadge {
	private TechnicianInfo techInfo;

	@ManyToOne
	@JoinColumn(name = "techInfo")
	public TechnicianInfo getTechInfo() {
		return techInfo;
	}

	public void setTechInfo(TechnicianInfo techInfo) {
		this.techInfo = techInfo;
	}

	@Override
	public boolean equals(Object obj) {
		if (null == obj && null == techInfo)
			return true;
		else {
			if (obj instanceof TechnicianBadge) {
				TechnicianBadge temp = (TechnicianBadge) obj;
				if (null != temp.getId() && null != techInfo.getId()) {
					if (temp.getId() == this.techInfo.getId())
						return true;
					else
						return false;
				} else
					return false;
			} else
				return false;
		}
	}

}
