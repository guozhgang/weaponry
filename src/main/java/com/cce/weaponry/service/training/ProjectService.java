package com.cce.weaponry.service.training;

import java.util.List;

import com.cce.weaponry.entity.training.Project;


public interface ProjectService {

	public abstract Project get(Long id);


	public abstract List<Project> getAll();


}
