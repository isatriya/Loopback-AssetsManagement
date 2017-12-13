import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// services
import { CategoryService } from '../../services/category.service';

// class
import { Category } from '../category';

// alert service
import { AlertService } from '../../_services/index';

@Component({
		selector: 'app-category-edit',
		templateUrl: '../category-form.component.html',
		styleUrls: ['../category-form.component.css']

})
export class CategoryEditComponent implements OnInit {

	category = new Category();
	categories: Category[];
	hasChild = false;
	
	checklists = [
		{
			id: "monitor",
			name: "Monitor"
		},
		{
			id: "power_supply",
			name: "Power Supply"
		},
		{
			id: "pc",
			name: "Personal Computer"
		}
	]


	constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService, private alertService: AlertService) { }

	ngOnInit() {
		console.log(this.category);
		this.getCategory(this.route.snapshot.params['id']);
		this.getParentCategories(this.route.snapshot.params['id']);
		this.getChildCategories(this.route.snapshot.params['id']);
	}

	onSubmit(form: NgForm) { 
		console.log("submit edit");

		let inputFields = form.value;
		let updateCategory = new Category();
		updateCategory = inputFields;
		
		this.categoryService.updateCategory(updateCategory)
			.then( category => {
				console.log(category);
				this.alertService.success('asset category updated!');
				setTimeout((router: Router) => {
					this.router.navigate(['/categories']);
				}, 1000);
			})
			.catch( e => {
				console.log(e);
				this.alertService.error('Could not update asset category');
			});
	}


	getCategory(id){
		this.categoryService.getCategory(id)
			.then( category => {
				console.log(category);
				this.category = category;
			})
			.catch( e => console.log(e));
	}

	getParentCategories(exceptId = null) {
		this.categoryService.getParentCategories(exceptId).subscribe(
			data => {
				console.log(data);
				this.categories = data;
			},
			err => {
				console.log('Error occured.');
			}
		);
	}

	getChildCategories(parentId){
		this.categoryService.getChildCategories(parentId).subscribe(
			data => {
				console.log(data)
				if (data.length > 0){
					this.hasChild = true;
				}
				console.log(this.hasChild);
			},
			err => {
				console.log('Error occured.');
			}
		);
	}
}
