# data-table-kit
Create data tables in your Angular apps.  
[Samples](https://component-kit-ng.codeenthusiast.com/)

## Features
- Sort Columns
- Resize Columns 
- Paginate
- Group Columns
- Hieararchical Tables
- Buffered Fetch


## Usage
This is a [Node.js](https://nodejs.org/en/) module available through the npm registry. Installation is done using the npm install command:

```bash
$ npm install data-table-kit --save
```

After installing add module to your Angular module file

**Angular Module**
```bash
import { DataTableKitModule } from 'data-table-kit';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    DataTableKitModule
  ],
  ...
})

```
**Component Template**
```bash
<data-table [tabledata]="<yourdata>" allowResize="true" pagesize="20">
  <div *data-table-column='let row=data; align:"left"; header: "Header"; sort:"code";'>
    {{row?.*field*}}
  </div>
  <div *data-table-column='let row=data; align:"center"; header: ["Multi-Line", "Header"];'>
    {{row?.*field1*}}<br/>
    {{row?.*field2*}}
  </div>
  <div *data-table-column='let row=data; align:"right"; header: "Amount"; groupHeader:"Invoiced Amount"; groupColumns: 3;'>
    {{row?.amount | currency}}
  </div>
  <div *data-table-column='let row=data; align:"right"; header: "Tax";'>
    {{row?.tax | currency}}
  </div>
  <div *data-table-column='let row=data; align:"right"; header: "Total";'>
    {{row?.total | currency}}
  </div>
</data-table>
```

## License
[MIT](https://opensource.org/licenses/MIT)
