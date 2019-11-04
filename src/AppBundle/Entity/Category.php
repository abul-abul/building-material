<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Category
 *
 * @ORM\Table(name="category")
 * @ORM\Entity(repositoryClass="AppBundle\Entity\Repository\CategoryRepository")
 */
class Category
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var
     * @ORM\Column(name="name", type="string", nullable=false)
     */
    protected $name;


    /**
     * @ORM\OneToMany(targetEntity="Product", mappedBy="category",  cascade={"persist", "remove"})
     */
    protected $product;

    /**
     * @ORM\ManyToOne(targetEntity="Category", inversedBy="children")
     * @ORM\JoinColumn(name="parent_category", referencedColumnName="id", onDelete="SET NULL")
     */
    protected $parent_category;

    /**
     * @ORM\OneToMany(targetEntity="Category", mappedBy="parent_category")
     */
    private $children;

    /**
     * @ORM\Column(
     *     name="status",
     *     type="boolean",
     *     options={"default": 1}
     * )
     */
    private $status = true;

    /**
     * @return string
     */
    public function __toString()
    {
        return (string) $this->getName();
    }

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name.
     *
     * @param string $name
     *
     * @return Category
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->product = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add product.
     *
     * @param \AppBundle\Entity\Product $product
     *
     * @return Category
     */
    public function addProduct(\AppBundle\Entity\Product $product)
    {
        $this->product[] = $product;

        return $this;
    }

    /**
     * Remove product.
     *
     * @param \AppBundle\Entity\Product $product
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeProduct(\AppBundle\Entity\Product $product)
    {
        return $this->product->removeElement($product);
    }

    /**
     * Get product.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getProduct()
    {
        return $this->product;
    }

    /**
     * Set status.
     *
     * @param bool $status
     *
     * @return Category
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status.
     *
     * @return bool
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set parentCategory.
     *
     * @param \AppBundle\Entity\Category|null $parentCategory
     *
     * @return Category
     */
    public function setParentCategory(\AppBundle\Entity\Category $parentCategory = null)
    {
        $this->parent_category = $parentCategory;

        return $this;
    }

    /**
     * Get parentCategory.
     *
     * @return \AppBundle\Entity\Category|null
     */
    public function getParentCategory()
    {
        return $this->parent_category;
    }

    /**
     * Add child.
     *
     * @param \AppBundle\Entity\Category $child
     *
     * @return Category
     */
    public function addChild(\AppBundle\Entity\Category $child)
    {
        $this->children[] = $child;

        return $this;
    }

    /**
     * Remove child.
     *
     * @param \AppBundle\Entity\Category $child
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeChild(\AppBundle\Entity\Category $child)
    {
        return $this->children->removeElement($child);
    }

    /**
     * Get children.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getChildren()
    {
        return $this->children;
    }
}
