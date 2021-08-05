package model;

// tip kupca. Unapred se ucitavaju tipovi. Kad se kreira kupac dodaje mu se sa najmanje requiredPoints. 
// Kad mu se povecavaju/smanjuju bodovi uporedjuje se sa sledecim. 
public class TypeBuyer {

	private String name;
	private int discount; // u procentima
	private int requiredPointsForNext;

	public TypeBuyer() {

	}

	public TypeBuyer(String name, int discount, int requiredPointsForNext) {
		super();
		this.name = name;
		this.discount = discount;
		this.requiredPointsForNext = requiredPointsForNext;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getDiscount() {
		return discount;
	}

	public void setDiscount(int discount) {
		this.discount = discount;
	}

	public int getRequiredPointsForNext() {
		return requiredPointsForNext;
	}

	public void setRequiredPointsForNext(int requiredPointsForNext) {
		this.requiredPointsForNext = requiredPointsForNext;
	}

	@Override
	public String toString() {
		return "TypeBuyer [name=" + name + ", discount=" + discount + ", requiredPointsForNext=" + requiredPointsForNext
				+ "]";
	}
	
	

}
