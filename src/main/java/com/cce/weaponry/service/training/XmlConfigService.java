package com.cce.weaponry.service.training;

import java.util.List;

import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.Element;

public abstract class XmlConfigService<PK> {

	// abstract String getConfigNames();

	abstract String getObjectName();

	abstract void reload();

	boolean firstRun = true;

	String getAttribute(Element e, String name) {
		Attribute attr = e.attribute(name);
		if (attr != null)
			return attr.getText();
		return "";
	}

	// Document getDocs() throws DocumentException {
	// SAXReader reader = new SAXReader();
	// InputStream in = this.getClass().getClassLoader().getResourceAsStream(
	// getConfigNames());
	// Document doc = reader.read(in);
	// return doc;
	// }

	Element getElement(Document doc, PK id) {
		return getElement(doc, getObjectName(), id);

	}

	@SuppressWarnings("unchecked")
	Element getElement(Document doc, String objectName, PK id) {
		System.out.println("getElement " + objectName + "  " + id.toString());
		Element root = doc.getRootElement();
		List<Element> list = root.elements(objectName);
		for (int i = 0; i < list.size(); i++) {
			Element e = list.get(i);
			if (id.toString().equals(getAttribute(e, "id")))
				return e;
		}
		// throw new Exception("getElement return null");
		System.out.println("getElement return null");
		return null;

	}

}
