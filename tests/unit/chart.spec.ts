import { shallowMount } from "@vue/test-utils";
import { Chart } from "@/components/Chart";
import { Chart as Chartjs } from "chart.js";
import { ref } from "@vue/reactivity";

const mockChartjsInstance = {
  data: {},
  options: {},
  type: "",
  update: jest.fn(),
};

jest.mock("chart.js", () => {
  return {
    Chart: jest.fn().mockImplementation(() => {
      return mockChartjsInstance;
    }),
  };
});

const DEFAULT_PROPS = {
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [1, 2, 3, 4, 5, 6],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Example Chart",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
  type: "bar" as const,
};

describe("HelloWorld.vue", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  it("renders chart on mount", () => {
    shallowMount(Chart, {
      props: DEFAULT_PROPS,
    });

    expect(Chartjs).toBeCalledWith(expect.anything(), DEFAULT_PROPS);
  });

  it("updates chart when reactive data prop is updated", async () => {
    const data = ref(DEFAULT_PROPS.data);
    const wrapper = shallowMount(Chart, {
      props: {
        ...DEFAULT_PROPS,
        data: data.value,
      },
    });
    data.value.datasets[0].data = [6, 5, 4, 3, 2, 1];
    await wrapper.vm.$nextTick();
    expect(mockChartjsInstance.data).toStrictEqual({
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [6, 5, 4, 3, 2, 1],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
    expect(mockChartjsInstance.update).toHaveBeenCalled();
  });

  it("updates chart when reactive options prop is updated", async () => {
    const options = ref(DEFAULT_PROPS.options);
    const wrapper = shallowMount(Chart, {
      props: {
        ...DEFAULT_PROPS,
        options: options.value,
      },
    });
    options.value.plugins.title.text = "changed";
    await wrapper.vm.$nextTick();
    expect(mockChartjsInstance.options).toStrictEqual({
      plugins: {
        title: {
          display: true,
          text: "changed",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    });
    expect(mockChartjsInstance.update).toHaveBeenCalled();
  });
});
