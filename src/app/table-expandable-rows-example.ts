import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import { MatTableDataSource } from '@angular/material/table';
/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'table-expandable-rows-example',
  styleUrls: ['table-expandable-rows-example.css'],
  templateUrl: 'table-expandable-rows-example.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TableExpandableRowsExample implements OnInit {
  isLoadingData: boolean = true; // 用來標記資料是否正在加載
  ngOnInit(): void {}
  constructor(private cd: ChangeDetectorRef) {}
  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('container') container: ElementRef;
  // @ViewChildren(MatSort) sortList = new QueryList<MatSort>();

  // lastScrollPosition: number = 0; // 用來記錄上一次的滾動位置

  // ngAfterViewInit() {
  //   this.sortList.changes.subscribe(() => {
  //     // Ensure sortList is initialized and not empty
  //     if (this.sortList && this.sortList.length > 0) {
  //       this.dataSource.sort = this.sortList.first;
  //     }
  //   });
  // }

  // ngAfterViewInit() {
  //   this.sortList.changes.subscribe(() => {
  //     // 保证 sortList 已经初始化且不为空
  //     // 使用 setTimeout 来避免变更检测错误
  //     setTimeout(() => {
  //       this.dataSource.sort = this.sortList.first;
  //       this.saveScrollPosition(); // 執行排序後恢復滾動位置
  //     });
  //   });
  // }

  // 儲存當前的滾動位置
  // saveScrollPosition() {
  //   this.lastScrollPosition = this.container.nativeElement.scrollTop;
  // }

  // // 恢復到上一次的滾動位置
  // restoreScrollPosition() {
  //   this.container.nativeElement.scrollTop = this.lastScrollPosition;
  // }

  // scrollToWeight(position: number) {
  //   const dataArray: Array<PeriodicElement> = this.dataSource.data;
  //   const targetIndex = dataArray.findIndex(
  //     (element) => element.position === position
  //   );
  //   if (targetIndex !== -1) {
  //     const element = this.container.nativeElement;
  //     const itemSize = 30; // Adjust this based on your item height
  //     element.scrollTo({ top: targetIndex * itemSize, behavior: 'smooth' });
  //   } else {
  //     console.log('Weight not found in the list.');
  //   }
  // }

  dataSource = new TableVirtualScrollDataSource(ELEMENT_DATA);
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  expandedElement: PeriodicElement | null;
  secondDataSource = new MatTableDataSource();

  secondColumnsToDisplay = ['name', 'weight', 'symbol', 'position'];
 // 添加到第二个标签页的方法
 addToSecondTab(element: PeriodicElement) {
  this.secondDataSource.data.push(element);
  // this.dataSource.data.push(element);
  // 手動觸發變更檢測以更新視圖
  // setTimeout(() => {
  //   this.secondDataSource.data = [...this.secondDataSource.data]; // 手動觸發更新
  // }, 0);
  console.log(this.dataSource.data);
  // console.log(this.secondDataSource.data); // 這裡只是為了確認資料被成功添加

  this.secondDataSource.data = [...this.secondDataSource.data];
}
// onTabChange(event: MatTabChangeEvent) {
//   if (event.tab.textLabel === 'Second') {
//     if (this.secondDataSource && this.secondDataSource.length > 0) {
//       console.log('Second tab data exists:', this.secondDataSource);
//     } else {
//       console.log('No data in second tab');
//     }
//   }
// }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description?: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`,
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`,
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`,
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`,
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`,
  },
];
// const REPEATED_DATA: PeriodicElement[] = Array.from(
//   { length: 10000 },
//   (_, index) => ({ ...ELEMENT_DATA[index % ELEMENT_DATA.length] })
// );

/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */