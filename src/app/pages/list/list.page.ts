import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListStore } from '../../stores/list-store';
import { IList } from '../../interfaces/list';

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

    private list: IList;

    constructor(
        private route: ActivatedRoute,
        private store: ListStore
    ) {
        let id: string = this.route.snapshot.paramMap.get('id');

        this.store.lists.subscribe((lists: IList[]) => {
            this.list = lists.find((list: IList) => {
                return list.id === id;
            });
        });
    }

    ngOnInit() { }

}
