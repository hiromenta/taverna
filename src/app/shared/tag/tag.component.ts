import { Component, Input } from "@angular/core";
import { Tag } from "../../models/tag.model";

@Component({
    selector: 'my-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss']
})
export class TagComponent {

    @Input() icon?: string;
    @Input() text: string = '';
    @Input() type: Tag = 'info';

    //

}