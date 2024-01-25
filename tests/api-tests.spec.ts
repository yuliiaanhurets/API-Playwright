import { test, expect } from '@playwright/test';

test.describe('Reqres - API', () => {
  test("should return list of users", async ({ request }) => {
    const issues = await request.get('api/users?page=2');
    expect(issues.status()).toBe(200);

    const responseJson = await issues.json();
    expect(responseJson.page).toBe(2);
    expect(responseJson.per_page).toBe(6);

    expect(responseJson.data.length).toBe(6);
    expect(responseJson.data[0].first_name).toBe("Michael");

    expect(await responseJson.data).toContainEqual(
      expect.objectContaining({
        id: 9,
        email: "tobias.funke@reqres.in",
        first_name: "Tobias",
        last_name: "Funke",
        avatar: "https://reqres.in/img/faces/9-image.jpg",
      })
    );
  });

  test("should create new user", async ({ request }) => {
    const response = await request.post('/api/users', {
      data: {
        name: "Amanda",
        job: "Seyfrid",
      },
    });

    const responsJson = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    expect(await responsJson.name).toBe("Amanda");
    expect(await responsJson.job).toBe("Seyfrid");
  });

  test("should update user", async ({ request }) => {
    const response = await request.put('/api/users/2', {
      data: {
        name: "morpheus",
        job: "zion resident",
      },
    });

    const responsJson = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    expect(await responsJson.name).toBe("morpheus");
    expect(await responsJson.job).toBe("zion resident");
  });

  test("should delete user", async ({ request }) => {
    const response = await request.delete('/api/users/2');

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(204);
  });

  test("should update user - patch", async ({ request }) => {
    const response = await request.patch('/api/users/2', {
      data: {
        name: "Matrix",
      },
    });

    const responsJson = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    expect(await responsJson.name).toBe("Matrix");
  });
});