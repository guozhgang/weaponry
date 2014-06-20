package com.cce.weaponry.web.vo.trans;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.FatalBeanException;
import org.springframework.util.Assert;

public class BaseVDOConverter {
	protected Logger logger = LoggerFactory.getLogger(getClass());

	protected void copyBean(Object source, Object target) {
		Assert.notNull(source, "Source must not be null");
		Assert.notNull(target, "Target must not be null");
		Class<?> sourceEditable = source.getClass();
		Class<?> targetEditable = target.getClass();

		PropertyDescriptor[] sourcePds = BeanUtils.getPropertyDescriptors(sourceEditable);
		PropertyDescriptor[] targetPds = BeanUtils.getPropertyDescriptors(targetEditable);

		for (PropertyDescriptor sourcePd : sourcePds) {
			if (sourcePd != null && sourcePd.getReadMethod() != null) {
				try {
					PropertyDescriptor targetPd = BeanUtils.getPropertyDescriptor(target.getClass(), sourcePd.getName());
					Method readMethod = sourcePd.getReadMethod();
					Method writeMethod = null;
					if (targetPd != null) {
						writeMethod = targetPd.getWriteMethod();
					}
					if (!Modifier.isPublic(readMethod.getDeclaringClass().getModifiers())) {
						readMethod.setAccessible(true);
					}
					Object value = readMethod.invoke(source);
					if (value == null) {
						continue;
					}
					if (targetPd == null) {
						doSpecialProcess(sourcePd.getName(), value, target);
						continue;
					}
					if (writeMethod == null) {
						continue;
					}
					if (!Modifier.isPublic(writeMethod.getDeclaringClass().getModifiers())) {
						writeMethod.setAccessible(true);
					}
					writeMethod.invoke(target, value);
				} catch (Throwable ex) {
					logger.debug(sourcePd.getName());
					throw new FatalBeanException("Could not copy properties from source to target", ex);
				}
			}
		}
	}

	protected void doSpecialProcess(String srcName, Object srcValue, Object target) {
	}
}
