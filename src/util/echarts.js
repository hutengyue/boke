import * as echarts from 'echarts/core';
import { LineChart,MapChart,PieChart,ScatterChart } from 'echarts/charts';
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
} from 'echarts/components';
import { UniversalTransition,LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
    PieChart,
    LineChart,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    UniversalTransition,
    LabelLayout,
    CanvasRenderer,
    MapChart,
    ScatterChart
])
export default echarts