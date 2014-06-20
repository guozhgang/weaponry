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
@DiscriminatorValue("Officer")
public class EnforceOfficerBadge extends UserBadge {
	private EnforceOfficer eofficer;

	@ManyToOne
	@JoinColumn(name = "eofficer")
	public EnforceOfficer getEofficer() {
		return eofficer;
	}

	public void setEofficer(EnforceOfficer eofficer) {
		this.eofficer = eofficer;
	}

	@Override
	public boolean equals(Object obj) {
		if (null == obj && null == eofficer)
			return true;
		else {
			if (obj instanceof TechnicianBadge) {
				TechnicianBadge temp = (TechnicianBadge) obj;
				if (null != temp.getId() && null != eofficer.getId()) {
					if (temp.getId() == this.eofficer.getId())
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
